package cn.tendata.bgsys.xinbee.model;

/**
 * Created by SayId on 2017/4/12.
 */
public class BenchMarksDto {
    private static final long serialVersionUID = 1L;

    private String code;

    private String explainChinese;

    private String explainEnglish;

    private int score;

    private boolean disabled;

    private boolean deleted;

    private Double spamCheckScore;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExplainChinese() {
        return explainChinese;
    }

    public void setExplainChinese(String explainChinese) {
        this.explainChinese = explainChinese;
    }

    public String getExplainEnglish() {
        return explainEnglish;
    }

    public void setExplainEnglish(String explainEnglish) {
        this.explainEnglish = explainEnglish;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Double getSpamCheckScore() {
        return spamCheckScore;
    }

    public void setSpamCheckScore(Double spamCheckScore) {
        this.spamCheckScore = spamCheckScore;
    }
}
