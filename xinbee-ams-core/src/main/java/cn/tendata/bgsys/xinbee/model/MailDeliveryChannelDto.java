package cn.tendata.bgsys.xinbee.model;

/**
 * Created by SayId on 2017/3/21.
 */
public class MailDeliveryChannelDto {
    private static final long serialVersionUID = 1L;

    public Integer id;
    public String description;
    public boolean disabled;
    public int fee;
    public int maxNumLimit;
    public String name;
    public int sequence;
    public long version;
    public Integer channelCode;

    public Boolean unsubscribeLink;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
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

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public Integer getChannelCode() {
        return channelCode;
    }

    public void setChannelCode(Integer channelCode) {
        this.channelCode = channelCode;
    }

    public Boolean getUnsubscribeLink() {
        return unsubscribeLink;
    }

    public void setUnsubscribeLink(Boolean unsubscribeLink) {
        this.unsubscribeLink = unsubscribeLink;
    }
}
