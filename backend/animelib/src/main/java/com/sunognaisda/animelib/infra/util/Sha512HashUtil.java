package com.sunognaisda.animelib.infra.util;

import org.apache.shiro.crypto.hash.Sha512Hash;

public class Sha512HashUtil {
    private static String salt = "asinSaDagat";
    private static int hashIterations = 5000;

    public static String encryptPassword(String password) {
        Sha512Hash sha512Hash = new Sha512Hash(password, salt, hashIterations);
        return sha512Hash.toHex();
    }

    public static boolean verifyPassword(String password, String dbHashedPassword) {
        Sha512Hash sha512Hash = new Sha512Hash(password, salt, hashIterations);
        String hashedPassword = sha512Hash.toHex();
        return hashedPassword.equals(dbHashedPassword);
    }
}
