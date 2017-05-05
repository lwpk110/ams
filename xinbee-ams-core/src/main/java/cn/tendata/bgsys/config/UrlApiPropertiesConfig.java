package cn.tendata.bgsys.config;

import org.springframework.beans.factory.annotation.Value;

/**
 * Created by jeashi on 2017/4/1.
 */
public class UrlApiPropertiesConfig {

    @Value("${link.scs.root}/api/xinbee/channel")
    public String channelOfAll;

    @Value("${link.rcs.root}/api/xinbee/bounce/soft")
    public String softBounceReport;

    @Value("${link.scs.root}/api/xinbee/tasks")
    public String tasksUrl;

    @Value("${link.scs.root}/api/xinbee/tasks/resend")
    public String resendUrl;

    @Value("${link.scs.root}/api/xinbee/tasks/cancel")
    public String cancelUrl;

    @Value("${link.scs.root}/api/xinbee/mailchannel/get")
    public String GetChannelUrl;

    @Value("${link.scs.root}/api/xinbee/mailchannel/edit")
    public String editChannelUrl;

    @Value("${link.rcs.root}/api/xinbee/channel/report")
    public String getChannelReportStatsUrl;

    @Value("${link.rcs.root}/api/xinbee/channel/total_report")
    public String getChannelTotalStatsUrl;

    @Value("${link.rcs.root}/api/xinbee/channel/quality_report")
    public String getChannelQualityStatsUrl;

    @Value("${link.rcs.root}/api/xinbee/batch/invoke/{serverKey}")
    public String invokeChannelUrl;

    @Value("${link.scs.root}/api/xinbee/admin/bench_marks")
    public String getBenchMarksUrl;

    @Value("${link.scs.root}/api/xinbee/admin/bench_marks/{id}")
    public String editBenchMarksUrl;

    @Value("${link.scs.root}/api/xinbee/admin/bench_marks/{id}")
    public String deleteBenchMarksUrl;

    @Value("${link.scs.root}/api/xinbee/admin/bench_marks/add")
    public String addBenchMarksUrl;

    @Value("${link.scs.root}/api/xinbee/template/score_list")
    public String marksLogUrl;

    @Value("${link.scs.root}/api/xinbee/template/{id}/score_detail")
    public String marksLogDetailsUrl;

}
