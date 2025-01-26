package org.tools.mysystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * Configuration
 */
@Configuration
@Import(InfrastructureConfig.class)
public class PlainJpaConfig {
}