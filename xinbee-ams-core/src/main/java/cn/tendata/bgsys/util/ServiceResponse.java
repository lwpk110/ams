package cn.xinbee.rcs.web.model;


import java.io.Serializable;
import java.util.HashMap;

/**
 * Created by jeashi on 2016/11/28.
 */
public class ServiceResponse extends HashMap implements Serializable {

    public static final String MSG_SUCCESS = "success";
    public static final String MSG_ERRCODE = "errcode";
    public static final String MSG_ERRMSG = "errmsg";
    public static final String MSG_TIMES = "$times$";

    private Object content;

    public ServiceResponse() {
        put(MSG_SUCCESS, false);
        put(MSG_ERRCODE, null);
        put(MSG_ERRMSG, null);
    }

    public void setSuccess(boolean success) {
        put(MSG_SUCCESS, success);
    }

    public void setErrcode(String errcode) {
        put(MSG_ERRCODE, errcode);
    }

    public void setErrmsg(Object errmsg) {
        put(MSG_ERRMSG, errmsg);
    }

    public static ServiceResponse initServiceReponse(boolean success, Object content, String errcode, Object errmsg) {
        ServiceResponse serviceOutput = new ServiceResponse();
        serviceOutput.setSuccess(success);
        serviceOutput.setContent(content);
        serviceOutput.setErrcode(errcode);
        serviceOutput.setErrmsg(errmsg);
        return serviceOutput;
    }

    public static ServiceResponse initServiceReponseSuccess() {
        ServiceResponse serviceOutput = new ServiceResponse();
        serviceOutput.setSuccess(true);
        serviceOutput.setErrcode("0");
        serviceOutput.setErrmsg(null);
        return serviceOutput;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        put("result",content);
        this.content = content;
    }
}
