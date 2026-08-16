<script lang="ts">
	import type { CoverageStatus } from '$lib/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const STATUS: Record<CoverageStatus, { label: string; detail: string }> = {
		in_dataset: { label: 'อยู่ในตารางเปรียบเทียบ', detail: 'ข้อมูลผ่านเกณฑ์ที่ใช้แสดงในตารางแล้ว' },
		insufficient_data: { label: 'ข้อมูลยังไม่พอ', detail: 'พบผลิตภัณฑ์แล้ว แต่ยังขาดราคา เงื่อนไข หรือเอกสารสัญญาที่จับคู่กันได้' },
		not_found: { label: 'ไม่พบผลิตภัณฑ์', detail: 'ตรวจแหล่งข้อมูลทางการแล้ว แต่ไม่พบผลิตภัณฑ์ในขอบเขต' },
		not_verified: { label: 'ยังยืนยันไม่ได้', detail: 'มีร่องรอยข้อมูล แต่ยังไม่มีแหล่งทางการที่ยืนยันว่าขายอยู่และมีเงื่อนไขใด' },
		out_of_scope: { label: 'อยู่นอกหมวดเปรียบเทียบ', detail: 'ไม่ควรนำไปเทียบกับประกันสุขภาพแบบเหมาจ่ายทั่วไป' }
	};

	const statusOrder: CoverageStatus[] = ['insufficient_data', 'not_verified', 'out_of_scope', 'not_found', 'in_dataset'];
	const groups = statusOrder
		.map((status) => ({ status, records: data.coverage.filter((record) => record.status === status) }))
		.filter((group) => group.records.length > 0);
</script>

<svelte:head><title>สถานะข้อมูลที่กำลังตรวจ — เทียบประกันสุขภาพไทย</title></svelte:head>

<section class="max-w-3xl">
	<h1 class="text-xl font-bold tracking-tight">สถานะข้อมูลที่กำลังตรวจ</h1>
	<p class="text-muted mt-3">
		รายการนี้คือบริษัทหรือผลิตภัณฑ์ที่เราตรวจพบจริง แต่ยังไม่ใส่ในตารางเปรียบเทียบเมื่อหลักฐานไม่ครบ
		ไม่ใช่รายชื่อที่ถูกปฏิเสธ และไม่ใช่คำแนะนำให้ซื้อ
	</p>
	<p class="text-muted mt-2 text-sm">
		เราแยก “ข้อมูลยังไม่พอ” ออกจาก “ยังยืนยันไม่ได้” เพื่อให้เห็นว่าต้องหาอะไรต่อ แทนที่จะปล่อยให้ชื่อบริษัทหายไปเฉย ๆ
	</p>
</section>

<div class="mt-8 max-w-4xl space-y-8">
	{#each groups as group}
		<section>
			<h2 class="border-rule border-b pb-2 font-semibold">
				{STATUS[group.status].label} <span class="text-muted font-normal">({group.records.length})</span>
			</h2>
			<p class="text-muted mt-2 text-sm">{STATUS[group.status].detail}</p>
			<div class="mt-3 space-y-3">
				{#each group.records as record}
					<article class="border-border bg-surface border p-4">
						<h3 class="font-semibold">{record.insurer.th}</h3>
						{#if record.product_name}
							<p class="text-muted mt-0.5 text-sm">{record.product_name.th}</p>
						{/if}
						<p class="mt-3 text-sm">{record.finding}</p>
						{#if record.not_entered_reason}
							<p class="text-muted mt-2 text-sm"><span class="font-semibold">สิ่งที่ยังขาด:</span> {record.not_entered_reason}</p>
						{/if}
						<div class="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
							<span>ตรวจล่าสุด {record.checked_on}</span>
							{#each record.sources as source}
								<a class="text-accent underline underline-offset-2" href={source.url} target="_blank" rel="noreferrer">แหล่งข้อมูลทางการ</a>
							{/each}
							{#if record.research_url}
								<a class="text-accent underline underline-offset-2" href={record.research_url} target="_blank" rel="noreferrer">บันทึกการค้นคว้า</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/each}
</div>
