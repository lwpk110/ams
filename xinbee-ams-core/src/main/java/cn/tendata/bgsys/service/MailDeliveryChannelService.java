package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.model.MailDeliveryChannelDto;

import java.util.List;

/**
 * Created by SayId on 2017/3/22.
 */
public interface MailDeliveryChannelService {

    List<MailDeliveryChannelDto> getAll();

    void editSave(MailDeliveryChannelDto mailDeliveryChannelDto);

}
