jQuery.fn.slider = function(width, height, speed){
	$(this).prepend('<a href="" class="btn_left btn_arrow"></a><a href="" class="btn_right btn_arrow"></a>');
	$(this).append('<ul class="paging"></ul>');
	var arrow = $('.btn_arrow', this).width() * 2,
		itemWidth = width - arrow,
		count = $('.item', this).size(),
		elem = this,
		wrapWidth = (width) * count;
	
	//Size for slider
	var page = '<li class="active" data-page="0"><a href="">1</a></li>';
	if(count > 1){
		for (var i = 2; i < count + 1; i++) {
			page += '<li data-page="'+ (i - 1) +'"><a href="">'+ i +'</a></li>'
		}
		$('.paging', elem).html(page);
	}	
	$(elem).width(width).height(height);
	$('.item', elem).width(itemWidth).height(height);	
	
	$('.item', elem).wrapAll('<div class="wrapper"></div>');
	$('.wrapper', elem).width(wrapWidth);
	
	var marginLeft = parseInt($('.wrapper', elem).css('margin-left'));
	
	function motion(m){
		$('.wrapper', elem).animate({
			marginLeft: marginLeft
		}, speed); 
	}
	
	//Move to left
	$('.btn_left', elem).click(function(e){
		e.preventDefault();
		console.log(marginLeft);
		if(marginLeft > (-1) * (wrapWidth - width)) {
			marginLeft -= width
			motion(marginLeft);
		}
		console.log(-marginLeft/width);
		$('.paging li', elem).removeClass('active');
		$('.paging li', elem).eq(-marginLeft/width).addClass('active');
	});
	//Move to right
	$('.btn_right', elem).click(function(e){
		e.preventDefault();
		console.log(marginLeft);
		if(marginLeft < 0) 
		{
			marginLeft += width
			motion(marginLeft);
		}
		console.log(-marginLeft/width);
		$('.paging li', elem).removeClass('active');
		$('.paging li', elem).eq(-marginLeft/width).addClass('active');
	});
	
	$('.paging a', elem).click(function(e){
		e.preventDefault();
		var number = $(this).parent().attr('data-page');		
		marginLeft = -width * number;
		motion(marginLeft);
		$('.paging li', elem).removeClass('active');
		$(this).parent().addClass('active');
	});
};