export interface OAuth2Response {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: SessionState;
}

export interface SessionState {
  extraQueryParams: ExtraQueryParams;
}

export interface ExtraQueryParams {
  authuser: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
