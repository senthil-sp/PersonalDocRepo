<script src="https://esharenewstaging.dhl.com/sites/Clarity/knowledge/SpendApprovalRequests/SiteAssets/jquery-3.2.1.min.js"></script>
<script>
$(function()
{
   $(".ms-core-sideNavBox-removeLeftMargin li ul").hide();
    var Collapse = "https://esharenewstaging.dhl.com/sites/Clarity/knowledge/SpendApprovalRequests/SiteAssets/collapse.gif";
    var Expand = "https://esharenewstaging.dhl.com/sites/Clarity/knowledge/SpendApprovalRequests/SiteAssets/expand.gif";
    //Find each top level UI and add reletive buttons & children numbers
    $('.ms-core-sideNavBox-removeLeftMargin ul li').find('ul').each(function(index) {
       var $this = $(this);           
       $this.parent().find('span:first .menu-item-text').parent().parent().parent().prepend(['<a class=\'min\' style=\'float:right; margin-left:5px;margin-top:6px;margin-right:5px;\'><img src=\'/_layouts/images/expand.gif\'/></a><span style=\'margin-top:5px;float:right;font-size:0.8em;\'></span>'].join(''));
    });

    $('.min').click(function()
    {
        var img = $(this).children();
        //Traverse the DOM to find the child UL node
        var subList = $(this).siblings('ul');
        //Check the visibility of the item and set the image           
        var Visibility = subList.is(":visible")? img.attr('src',Expand) : img.attr('src',Collapse);;
        //Toggle the UL
        subList.slideToggle("slow");
    });
});
</script>​​