 package com.google.sps.data;
 import com.google.auto.value.AutoValue;

 @AutoValue public abstract class Animal {
     public static Animal create(String name, int numberOfLegs) {
         return new AutoValue_Animal(name, numberOfLegs);
     }

      public abstract String name();
      public abstract int numberOfLegs();
 }