package com.sunognaisda.animelib.application.dto.user;

import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.domain.model.User;

public record UserResponse (User user, String token, ErrorContent errorContent) {
}