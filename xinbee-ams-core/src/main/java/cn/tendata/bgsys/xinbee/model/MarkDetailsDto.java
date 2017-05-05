package cn.tendata.bgsys.xinbee.model;

/**
 * Created by SayId on 2017/4/17.
 */
public class MarkDetailsDto {
    private static final long serialVersionUID = 1L;

    private String explainChinese;
    private double score;
    private String code;
    private String explainEnglish;

    public String getExplainChinese() {
        return explainChinese;
    }

    public void setExplainChinese(String explainChinese) {
        this.explainChinese = explainChinese;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExplainEnglish() {
        return explainEnglish;
    }

    public void setExplainEnglish(String explainEnglish) {
        this.explainEnglish = explainEnglish;
    }
}
