package com.google.sps.config;

public class Config {
  public String databasePassword;
  public String scheduledServletPassword;
  public Config() {
    this.databasePassword = "INSERT CLOUD SQL DATABASE PASSWORD HERE";
    this.scheduledServletPassword = "INSERT SCHEDULED SERVLET PASSWORD HERE"; // same as password specified in config.py (data_udpater service)
  }
}