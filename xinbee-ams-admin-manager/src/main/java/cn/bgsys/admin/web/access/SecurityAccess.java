package cn.bgsys.admin.web.access;

/**
 * Created by jeashi on 2017/3/31.
 */
public class SecurityAccess {






    public static String hasAuthority(String authority){
        return "hasAuthority('" + authority + "')";
    }

    private SecurityAccess(){

    }
}
