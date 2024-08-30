<template>
  <div>
    <el-row :gutter="20" v-if="showInfo">
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>流数</span>
                <div>{{Info.flowNum}} 条</div>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/流量监控.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>总IP报文数</span>
                <div>{{Info.totalIpPacket}} 个</div>
                </el-col>
                
                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/信息.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>平均字节数</span>
                <div>{{Info.avgByte.toFixed(2)}} Bytes</div>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/内容.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>总持续时间</span>
                <div>{{Info.totalTime.toFixed(2)}} s</div>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/活跃时间段.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20" v-if="showInfo">
        <el-col :span="6" style="height:90px">
            <el-card>
                <el-col :span="16">
                <span>上行IP报文数</span>
                <div>{{Info.sendIpPacket}} 个</div>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/上行宽带.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>下行IP报文数</span>
                <div>{{Info.recvIpPacket}} 个</div>
                </el-col>

                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/下行宽带.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>传输层平均载荷</span>
                <div>{{Info.tcp_avg_payload.toFixed(2)}} Bytes</div>
                </el-col>

                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/内容字段管理.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card style="height:90px">
                <el-col :span="16">
                <span>报文平均时间间隔</span>
                <div>{{(1000*Info.avg_int_arv_time).toFixed(2)}} ms</div>
                </el-col>

                <el-col :span="8">
                <el-image
                style="width: 100%; height: 100%"
                :src="require('@/assets/间隔分析.svg')"
                :fit="fill"></el-image>
                </el-col>
            </el-card>
        </el-col>
    </el-row>

    <el-row>
        <el-table :data="results" :default-sort="{ prop:
      'id', order: 'descending' }">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column prop="src_IP" label="源IP地址"></el-table-column>
            <el-table-column prop="src_port" label="源端口号"></el-table-column>
            <el-table-column prop="dst_IP" label="目的IP地址"></el-table-column>
            <el-table-column prop="dst_port" label="目的端口号"></el-table-column>
            <el-table-column align="center" prop="id" label="操作" width="130">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="getInfo(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
// import * as echarts from "echarts";
// import resize from "./mixins/resize";

export default {
  mounted() {
    window.Vue = this;
    // this.Data = JSON.parse(this.results);
    // this.initInfo();
    console.log(this.Info);
  },
  data() {
    return {
      results: this.$route.query.response.data.data,
      Info: {},
      showInfo: false,
    };
  },
  watch: {
  },
  methods: {
    initInfo(){
        // let this = this;
        // 流数
        this.Info["flowNum"] = this.results.length;
        // 总IP报文数
        let totalIpPacket = 0;
        for(let i = 0; i < this.results.length; i++){
            totalIpPacket += parseInt(this.results[i].total_pkt_count);
        }
        this.Info["totalIpPacket"] = totalIpPacket;
        // 平均字节数
        let avgByte = 0;
        for(let i = 0; i < this.results.length; i++){
            avgByte += parseFloat(this.results[i].avg_pkt_length);
        }
        this.Info["avgByte"] = avgByte / this.results.length;
        // 总持续时间
        let min_time = parseFloat(this.results[0].pkt_ts_first);
        let max_time = parseFloat(this.results[0].pkt_ts_last);
        for(let i = 1; i < this.results.length; i++){
            if(this.results[i].pkt_ts_first < min_time){
                min_time = parseFloat(this.results[i].pkt_ts_first);
            }
            if(this.results[i].pkt_ts_last > max_time){
                max_time = parseFloat(this.results[i].pkt_ts_last);
            }
        }
        this.Info["totalTime"] = max_time - min_time;

        // 上行IP报文数
        let sendIpPacket = 0;
        for(let i = 0; i < this.results.length; i++){
            sendIpPacket += parseInt(this.results[i].num_pkt_send);
        }
        this.Info["sendIpPacket"] = sendIpPacket;

        // 下行IP报文数
        let recvIpPacket = 0;
        for(let i = 0; i < this.results.length; i++){
            recvIpPacket += parseInt(this.results[i].num_pkt_recv);
        }
        this.Info["recvIpPacket"] = recvIpPacket;

        // 传输层平均载荷
        let tcp_avg_payload = 0;
        for(let i = 0; i < this.results.length; i++){
            tcp_avg_payload += parseFloat(this.results[i].tcp_avg_payload);
        }
        this.Info["tcp_avg_payload"] = tcp_avg_payload / this.results.length;

        // 报文平均时间间隔
        let avg_int_arv_time = 0;
        for(let i = 0; i < this.results.length; i++){
            avg_int_arv_time += parseFloat(this.results[i].avg_int_arv_time);
        }
        this.Info["avg_int_arv_time"] = avg_int_arv_time / this.results.length;

        this.showInfo = true;
    }
  },
};


</script>

<style>
    .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
</style>