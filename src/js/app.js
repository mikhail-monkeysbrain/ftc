$(function(){
	$('.tab_slide__click ul ').on('click','li:not(.active)',function(){
	$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('.tab_slide').find('.tab_slide__info-link').removeClass('active').eq($(this).index()).addClass('active');
	});
});
$(function(){
	$('ul.inside_tabs').on('click','li:not(.active)',function(){
	$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('.tab_slide__info-link.active').find('.inside_tabs_info').removeClass('active').eq($(this).index()).addClass('active');
	});
});
$(function(){
	$('.oval').click(function(){
		$(".inside_tabs li").fadeIn(400);
	});
	$(".inside_tabs li p").click(function(){
			$(".inside_tabs li:not(.active)").fadeOut(400);
		})
});