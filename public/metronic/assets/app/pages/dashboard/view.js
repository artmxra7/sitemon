Vue.component('monthrangepicker', {
    props: ['range'],
    template: `
        <div class="input-daterange input-group">
            <input type="text" class="form-control m-input" name="start" readonly style="background-color: white;"/>
            <div class="input-group-append">
                <span class="input-group-text"><i class="la la-ellipsis-h"></i></span>
            </div>
            <input type="text" class="form-control" name="end" readonly style="background-color: white;"/>
        </div>
    `,
    mounted: function() {
        $(this.$el).datepicker({
            rtl:mUtil.isRTL(),
            minViewMode: 'months',
        })
        .on('changeMonth', () => {
            this.handleChange()
        })
        .on('hide', () => {
            this.handleChange()
        });
    },
    methods: {
        handleChange() {
            var ctx = this;

            setTimeout(() => {
                var startEl = $('[name="start"]', $(ctx.$el));
                var endEl = $('[name="end"]', $(ctx.$el));
                var startValue = startEl.val();
                var endValue = endEl.val();
                var startMoment = moment(startValue, 'MMDDYYYY');
                var endMoment = moment(endValue, 'MMDDYYYY');
                
                startMoment = startMoment.isValid() ? startMoment : moment(startValue, 'MMM YYYY');
                endMoment = endMoment.isValid() ? endMoment : moment(endValue, 'MMM YYYY');

                startEl.val(startMoment.format('MMM YYYY'));
                endEl.val(endMoment.format('MMM YYYY'));

                var range = {
                    start: startMoment,
                    end: endMoment,
                }
    
                ctx.$emit('handlemonthrangepicker', { range });
            }, 1);
        }
    },
});

var vueInstance = new Vue({
    el: '#vueApp',
    delimiters: ['${', '}'],
    data() {
        return {
            siteUrl: window.App.siteUrl,
            filter: {
                monthRangeValue: {
                    start: null,
                    end: null
                }
            },
            // Graph
            totalDataForm1: {total: 0, accepted: 0},
            totalDataForm2: {total: 0, accepted: 0},
            totalDataSurvey: {total: 0, accepted: 0},
            totalPetugasSurvey: {total: 0, active: 0},
            totalDataApprovalRegional: {total: 0, accepted: 0},
            // Chart
            chartMapModel: [
                {
                    refName: 'chartPertumbuhanForm1',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'line',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_pertumbuhan_form1'
                },
                {
                    refName: 'chartPertumbuhanForm2',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'line',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_pertumbuhan_form2'
                },
                {
                    refName: 'chartPertumbuhanSurvey',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'line',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_pertumbuhan_survey'
                },
                {
                    refName: 'chartPetugasSurvey',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'line',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_petugas_survey'
                },
                {
                    refName: 'chartApprovalRegional',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'line',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_approval_regional'
                },
                {
                    refName: 'chartTotalDataPerWitel',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'bar',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_total_data_per_witel'
                },
                {
                    refName: 'chartTotalDataPerRegional',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'bar',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_total_data_per_regional'
                },
                {
                    refName: 'chartTotalDataPerSektorUsaha',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'bar',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_total_data_per_sektor_usaha'
                },
                {
                    refName: 'chartTotalDataPerNilaiPengajuan',
                    isCreating: false,
                    isCreated: false,
                    chartType: 'bar',
                    fetchUrl: window.App.siteUrl+'dashboard/ajax/graph_total_data_per_nilai_pengajuan'
                },
            ],
        };
    },
    created() {
        window.addEventListener('scroll', this.handleScrollEvent)
    },
    mounted() {
        this.populateTotalGraphData();
        
        this.initDateRangeFilter();
    },
    methods: {
        applyFilter() {
            this.populateTotalGraphData();
            this.chartMapModel.forEach(item => {
                this.getDataAndInitSingleChart(item);
            });
        },
        getFilterQueryString() {
            var queryString = {};
            var rangeStart = this.filter.monthRangeValue.start;
            var rangeEnd = this.filter.monthRangeValue.end;

            if (rangeStart) queryString['dateStart'] = rangeStart.startOf('month').format('DD-MM-YYYY');
            if (rangeEnd) queryString['dateEnd'] = rangeEnd.endOf('month').format('DD-MM-YYYY');
            
            if (Object.keys(queryString).length > 0) return '?'+$.param(queryString);
            
            return '';
        },
        populateTotalGraphData() {
            axios.get(this.siteUrl+'dashboard/ajax/graph_total_data'+this.getFilterQueryString()).then(response => {
                this.totalDataForm1 = response.data.totalDataForm1;
                this.totalDataForm2 = response.data.totalDataForm2;
                this.totalDataSurvey = response.data.totalDataSurvey;
                this.totalPetugasSurvey = response.data.totalPetugasSurvey;
                this.totalDataApprovalRegional = response.data.totalDataApprovalRegional;
            });
        },
        getPercentageForTotalGraph(totalData) {
            return (totalData.accepted / totalData.total) * 100;
        },
        initDateRangeFilter() {
            // var elSelector = this.daterangeFilterEl;

            // $(elSelector).datepicker({
            //     rtl:mUtil.isRTL(),
            //     minViewMode: 'months',
            //     format: {
            //         toDisplay: function(date, format, language) {
            //             console.log(date);
            //             // moment(date).format()
            //         }
            //     },
            // });
        },
        handleScrollEvent(event) {
            this.initChartOnScrollIfNotCreated(event);
        },
        initChartOnScrollIfNotCreated(event) {
            var bottomLimitToShow = (document.documentElement.scrollTop + document.documentElement.offsetHeight) + 500;

            this.chartMapModel.forEach(item => {
                var chartElPosition = this.$refs[item.refName].getBoundingClientRect().bottom;

                // Is chart ready to create
                if (!item.isCreating && !item.isCreated && (chartElPosition <= bottomLimitToShow)) {
                    this.getDataAndInitSingleChart(item);
                }
            });
        },
        getDataAndInitSingleChart(item) {
            item.isCreating = true;
            axios.get(item.fetchUrl+this.getFilterQueryString()).then(response => {
                this.initMorrisChart(item.chartType, item.refName, response.data);

                item.isCreated = true;
                item.isCreating = false;
            });
        },
        initMorrisChart(type, element, configs) {
            this.$refs[element].innerHTML = '';

            var colorsCollection = ['#34bfa3', '#ffb822', '#716aca', '#f4516c', '#36a3f7', '#cb4b4b', '#9440ed'];

            if (type == 'line') {
                new Morris.Line(Object.assign({
                    element: element,
                    lineColors: colorsCollection,
                    hideHover: true,
                }, configs));
            }

            if (type == 'bar') {
                new Morris.Bar(Object.assign({
                    element: element,
                    barColors: colorsCollection,
                    hideHover: true,
                }, configs));
            }
        },
        handleMonthRangePicker(payload) {
            this.filter.monthRangeValue = payload.range;
        }
    },
});