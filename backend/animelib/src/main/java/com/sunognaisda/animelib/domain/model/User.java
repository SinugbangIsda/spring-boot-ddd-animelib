package com.sunognaisda.animelib.domain.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User {
    @TableId(type = IdType.ASSIGN_ID)
    private long id;

    @TableField("last_name")
    private String lastName;

    @TableField("first_name")
    private String firstName;

    @TableField("email_address")
    private String emailAddress;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}
