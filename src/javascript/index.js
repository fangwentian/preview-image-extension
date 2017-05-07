$(function() {
    ({
        init: function() {
            this.injectButton();
            this.bindEvent();
        },
        bindEvent: function() {
            var self = this;
            var button = $("#_imagePreviewButton");
            button.on('click', function() {
                self.injectPreview();
            })
            $(document).on('click', '#_imagePreview .close', function() {
                $("#_imagePreview").toggleClass('f-dn');
            })
            $(document).on('click', '#_imagePreview .previous', function() {
                if(self.currentImage <= 0) return;
                self.currentImage -= 1;
                $("#_imagePreview .prevewImage").attr('src', self.imageUrls[self.currentImage]);
                $("#_imagePreview .count").text((self.currentImage+1) + '/' + self.imageUrls.length);
            })
            $(document).on('click', '#_imagePreview .next', function() {
                if(self.currentImage >= self.imageUrls.length - 1) return;
                self.currentImage += 1;
                $("#_imagePreview .prevewImage").attr('src', self.imageUrls[self.currentImage]);
                $("#_imagePreview .count").text((self.currentImage+1) + '/' + self.imageUrls.length);
            })
        },
        injectButton: function() {
            var button = $('<div id="_imagePreviewButton">预览</div>');
            $("body").append(button);
        },
        injectPreview: function() {
            var self = this;
            this.imageUrls = [];
            this.currentImage = 0;
            if($('#_imagePreview').length) {
                $("#_imagePreview").toggleClass('f-dn');
                return;
            }
            var dom = $(" \
                <div id='_imagePreview'> \
                    <span class='close'>x</span> \
                    <div class='previous'></div> \
                    <div class='next'></div> \
                    <div class='count'></div> \
                    <img src='' class='prevewImage'> \
                </div>"
            );
            var images = $('img');
            // 搜集图片url
            $.each(images, function(index, item) {
                if (item.src && item.src != '') {
                    self.imageUrls.push(item.src);
                }
            });
            dom.find('.prevewImage').attr('src', this.imageUrls[0]);
            dom.find(".count").text((self.currentImage+1) + '/' + self.imageUrls.length);
            $("body").append(dom);
        }
    }).init()
})