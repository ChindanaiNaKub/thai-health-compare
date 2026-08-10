<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>สนับสนุนเว็บนี้ — เทียบประกันสุขภาพไทย</title></svelte:head>

<h1 class="text-xl font-bold tracking-tight">สนับสนุนเว็บนี้</h1>

<div class="mt-4 max-w-sm space-y-4">
	<p class="text-muted">
		เว็บนี้ไม่มีโฆษณาและไม่มีลิงก์แนะนำ อยากช่วยออกค่าเซิร์ฟเวอร์ก็สแกนจ่ายพร้อมเพย์ได้เลย
		ให้เท่าไหร่ก็ได้ตามใจ
	</p>
	<div class="border-rule inline-block border-2 p-4">
		{@html data.qr}
	</div>
</div>
