package cn.bgsys.admin.web.model;

/**
 * Created by jeashi on 2017/2/7.
 */
public class MailChannelDto {
    public Integer channelCode;
    public String description;
    public int fee;
    public int maxNumLimit;
    public String name;
    public int sequence;

    public MailChannelDto(Integer channelCode, String description, int fee, int maxNumLimit, String name, int sequence) {
        this.channelCode = channelCode;
        this.description = description;
        this.fee = fee;
        this.maxNumLimit = maxNumLimit;
        this.name = name;
        this.sequence = sequence;
    }

    public Integer getChannelCode() {
        return channelCode;
    }

    public void setChannelCode(Integer channelCode) {
        this.channelCode = channelCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getFee() {
        return fee;
    }

    public void setFee(int fee) {
        this.fee = fee;
    }

    public int getMaxNumLimit() {
        return maxNumLimit;
    }

    public void setMaxNumLimit(int maxNumLimit) {
        this.maxNumLimit = maxNumLimit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

}
