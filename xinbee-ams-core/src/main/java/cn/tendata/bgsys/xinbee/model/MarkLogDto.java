package cn.tendata.bgsys.xinbee.model;

/**
 * Created by SayId on 2017/4/14.
 */
public class MarkLogDto {
    private String score;
    private String coreType;
    private String scoreTemplateId;

    private MailDeliveryTaskTemplate mailDeliveryTaskTemplate;
    private TemplateScoreSummary templateScoreSummary;

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getCoreType() {
        return coreType;
    }

    public void setCoreType(String coreType) {
        this.coreType = coreType;
    }

    public String getScoreTemplateId() {
        return scoreTemplateId;
    }

    public void setScoreTemplateId(String scoreTemplateId) {
        this.scoreTemplateId = scoreTemplateId;
    }

    public MailDeliveryTaskTemplate getMailDeliveryTaskTemplate() {
        return mailDeliveryTaskTemplate;
    }

    public void setMailDeliveryTaskTemplate(MailDeliveryTaskTemplate mailDeliveryTaskTemplate) {
        this.mailDeliveryTaskTemplate = mailDeliveryTaskTemplate;
    }

    public TemplateScoreSummary getTemplateScoreSummary() {
        return templateScoreSummary;
    }

    public void setTemplateScoreSummary(TemplateScoreSummary templateScoreSummary) {
        this.templateScoreSummary = templateScoreSummary;
    }


    class MailDeliveryTaskTemplate {

        private String taskId;

        public String getTaskId() {
            return taskId;
        }

        public void setTaskId(String taskId) {
            this.taskId = taskId;
        }
    }

    class TemplateScoreSummary {
        private String invokeDate;
        private String consumeTime;
        private boolean invokeStatus;
        private String platformCode;

        private MailTemplate mailTemplate;

        public String getInvokeDate() {
            return invokeDate;
        }

        public void setInvokeDate(String invokeDate) {
            this.invokeDate = invokeDate;
        }

        public String getConsumeTime() {
            return consumeTime;
        }

        public void setConsumeTime(String consumeTime) {
            this.consumeTime = consumeTime;
        }

        public boolean isInvokeStatus() {
            return invokeStatus;
        }

        public void setInvokeStatus(boolean invokeStatus) {
            this.invokeStatus = invokeStatus;
        }

        public String getPlatformCode() {
            return platformCode;
        }

        public void setPlatformCode(String platformCode) {
            this.platformCode = platformCode;
        }

        public MailTemplate getMailTemplate() {
            return mailTemplate;
        }

        public void setMailTemplate(MailTemplate mailTemplate) {
            this.mailTemplate = mailTemplate;
        }
    }

    class MailTemplate {
        private String subject;
        private String body;

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public String getBody() {
            return body;
        }

        public void setBody(String body) {
            this.body = body;
        }
    }


}
