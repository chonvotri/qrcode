$(function() {
    Wstoast.config({autoClose:true,showClose:true,html:true})
    new Vue({
        el: '#app',
        data: {
            set: {
                input: window.location.href,
                errorCorrectionLevel: 'high',//low, medium, quartile, high
                type: 'image/png',
                quality: 1,
                scale: 4,
                margin: 1,
                width: 256,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                },
                output: '',
            },
        },
        created() {
        },
        watch: {
            'set': {
                handler() {
                    if (this.set.input !== '') {
                        this.generate()
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.generate()
        },
        methods: {
            generate() {
                if (this.set.input === '') {
                 Wstoast.error('Vui lòng nhập nội dung!');
                    return
                }
                let that = this
                QRCode.toDataURL(this.set.input, this.set, function (err, url) {
                    if (err) throw err
                    that.set.output = url
                })
            },
            reset() {
                Wstoast.success('Cài lại thành công!');
                this.set.input = ''
                this.set.output = ''

            },
            download() {
                var MIME_TYPE = "image/png";

                var imgURL = $("#qrcode").attr('src');

                var dlLink = document.createElement('a');
                dlLink.download = 'qrcode';
                dlLink.href = imgURL;
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }
        },
    })
});