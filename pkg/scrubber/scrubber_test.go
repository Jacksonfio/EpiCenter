package scrubber

import "testing"

func TestScrub(t *testing.T) {
	s := New()

	tests := []struct {
		name     string
		input    string
		wantNone []string // strings that must NOT appear in output
	}{
		{
			name:     "redacts JWT",
			input:    "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
			wantNone: []string{"eyJhbGciOiJIUzI1NiJ9"},
		},
		{
			name:     "redacts email",
			input:    "User john.doe@example.com triggered an error",
			wantNone: []string{"john.doe@example.com"},
		},
		{
			name:     "redacts postgres URL",
			input:    "Failed to connect: postgres://admin:mysecretpass@prod-db.internal:5432/app",
			wantNone: []string{"mysecretpass", "prod-db.internal"},
		},
		{
			name:     "redacts password field",
			input:    `{"password": "super_secret_123", "user": "alice"}`,
			wantNone: []string{"super_secret_123"},
		},
		{
			name:     "redacts AWS key",
			input:    "Found key AKIAIOSFODNN7EXAMPLE in logs",
			wantNone: []string{"AKIAIOSFODNN7EXAMPLE"},
		},
		{
			name:     "redacts IP address",
			input:    "Request from 192.168.1.100 failed",
			wantNone: []string{"192.168.1.100"},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := s.Scrub(tc.input)
			for _, forbidden := range tc.wantNone {
				if contains(result, forbidden) {
					t.Errorf("Scrub() left sensitive value %q in output: %q", forbidden, result)
				}
			}
		})
	}
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && containsRune(s, substr))
}

func containsRune(s, sub string) bool {
	for i := 0; i <= len(s)-len(sub); i++ {
		if s[i:i+len(sub)] == sub {
			return true
		}
	}
	return false
}
