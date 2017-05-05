package cn.tendata.bgsys.xinbee;

import cn.tendata.bgsys.xinbee.model.BenchMarksDto;
import cn.tendata.bgsys.xinbee.model.MailDeliveryChannelDto;
import cn.tendata.bgsys.xinbee.model.MailDeliveryTaskDto;
import cn.tendata.bgsys.xinbee.model.PageData;

import java.util.List;

/**
 * Created by minjay on 2017/3/15.
 */
public interface XinbeeApiAccessManager {

    PageData<MailDeliveryTaskDto> getTasksByStatus(int page, int status);

    void resend(String[] ids);

    void cancel(String[] ids);

    List<MailDeliveryChannelDto> getListMailDeliveryChannel();

    void editChannel(MailDeliveryChannelDto mailDeliveryChannelDto);

    PageData<BenchMarksDto> getBenchMarks(String key, int page, String sortType);

    void addBenchMarks(BenchMarksDto benchMarksDto);

    void editBenchMarks(BenchMarksDto benchMarksDto,String id);

    void deleteBenchMarks(String id);


}
