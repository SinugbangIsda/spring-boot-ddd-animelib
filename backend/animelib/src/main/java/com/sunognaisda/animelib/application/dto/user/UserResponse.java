package com.sunognaisda.animelib.application.dto.user;

import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.domain.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private User user;
    private String token;
    private ErrorContent errorContent;
}
