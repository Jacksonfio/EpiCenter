package scrubber

import (
	"regexp"
	"strings"
)

// pattern represents a single redaction rule: a compiled regex and its replacement.
type pattern struct {
	re          *regexp.Regexp
	replacement string
}

// Scrubber redacts secrets and PII from arbitrary text before it is persisted or sent to an LLM.
type Scrubber struct {
	patterns []pattern
}

// New constructs a Scrubber pre-loaded with all built-in redaction rules.
func New() *Scrubber {
	rules := []struct {
		pattern     string
		replacement string
	}{
		// API Keys & tokens (generic high-entropy strings)
		{`(?i)(api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token)[=:\s"']+([A-Za-z0-9\-_]{20,})`, `$1=[REDACTED_KEY]`},
		// AWS credentials
		{`(?i)AKIA[0-9A-Z]{16}`, `[REDACTED_AWS_KEY_ID]`},
		{`(?i)aws[_-]?secret[_-]?access[_-]?key[=:\s"']+([A-Za-z0-9/+=]{40})`, `aws_secret_access_key=[REDACTED]`},
		// JWT tokens
		{`eyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+`, `[REDACTED_JWT]`},
		// PostgreSQL & generic connection strings
		{`postgres(?:ql)?://[^@]+@[^\s'"]+`, `[REDACTED_DB_URL]`},
		{`mysql://[^@]+@[^\s'"]+`, `[REDACTED_DB_URL]`},
		// GitHub PATs
		{`gh[pousr]_[A-Za-z0-9]{36,}`, `[REDACTED_GITHUB_PAT]`},
		// Slack tokens
		{`xox[baprs]-[0-9A-Za-z\-]+`, `[REDACTED_SLACK_TOKEN]`},
		// Generic passwords in key=value pairs
		{`(?i)(password|passwd|pwd|secret)[=:\s"']+\S+`, `$1=[REDACTED]`},
		// Email addresses
		{`[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}`, `[REDACTED_EMAIL]`},
		// IPv4 addresses
		{`\b(?:\d{1,3}\.){3}\d{1,3}\b`, `[REDACTED_IP]`},
		// Credit card numbers (loose match)
		{`\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b`, `[REDACTED_CC]`},
	}

	s := &Scrubber{}
	for _, r := range rules {
		compiled, err := regexp.Compile(r.pattern)
		if err != nil {
			continue
		}
		s.patterns = append(s.patterns, pattern{re: compiled, replacement: r.replacement})
	}
	return s
}

// Scrub applies all redaction rules to the input string and returns the sanitized result.
func (s *Scrubber) Scrub(input string) string {
	if strings.TrimSpace(input) == "" {
		return input
	}
	result := input
	for _, p := range s.patterns {
		result = p.re.ReplaceAllString(result, p.replacement)
	}
	return result
}
