package com.sunognaisda.animelib;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.sunognaisda.animelib.domain.mapper")
public class AnimelibApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimelibApplication.class, args);
	}

}
