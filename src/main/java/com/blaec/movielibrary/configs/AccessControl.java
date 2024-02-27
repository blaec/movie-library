package com.blaec.movielibrary.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.List;

@Data
@ConfigurationProperties(prefix = "control")
@ConstructorBinding
public class AccessControl {
    private String localSubnet;
    private List<String> externalIps;
}
