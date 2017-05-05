package cn.bgsys.admin.web.tool;

import org.joda.time.DateTime;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

public class StringToDatetimeConverter implements Converter<String, DateTime> {

    @Override
    public DateTime convert(String source) {
        if(StringUtils.isEmpty(source)){
            return  null;
        }
        return  DateTime.parse(source);
    }
}
