<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "animate.css";
	body{
		background:rgba(248,248,248,1);
	}
	.l-my-flex,.l-my-flex-bw,.l-my-flex-start{
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}
	.l-my-flex-bw{
		justify-content:space-between;
	}
	.l-my-flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.l-my-flex-start{
		justify-content:flex-start;
	}
</style>