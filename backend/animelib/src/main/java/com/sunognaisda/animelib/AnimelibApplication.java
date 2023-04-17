package com.sunognaisda.animelib;

import com.github.jeffreyning.mybatisplus.conf.EnableMPP;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableMPP
@MapperScan("com.sunognaisda.animelib.domain.mapper")
public class AnimelibApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimelibApplication.class, args);
	}

}
