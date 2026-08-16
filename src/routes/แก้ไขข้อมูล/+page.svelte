<script lang="ts">
	const repo = 'https://github.com/ChindanaiNaKub/thai-health-compare';
</script>

<svelte:head><title>แจ้งแก้ไขข้อมูล — เทียบประกันสุขภาพไทย</title></svelte:head>

<h1 class="text-xl font-bold tracking-tight">แจ้งแก้ไขข้อมูล</h1>

<div class="mt-4 max-w-2xl space-y-4">
	<p class="text-muted">
		ถ้าตัวเลขหรือเงื่อนไขในหน้านี้ไม่ถูกต้อง ล้าสมัย หรือไม่ตรงกับกรมธรรม์ แจ้งเราได้เลย
		ไม่ต้องเป็นตัวแทนหรือเจ้าหน้าที่บริษัทก็แจ้งได้ และเราไม่เก็บข้อมูลติดต่อของคุณไว้ใช้อย่างอื่น
	</p>

	<section>
		<h2 class="border-rule border-b pb-1 font-semibold">ช่องทาง</h2>
		<p class="text-muted mt-1">
			เปิด issue ที่ <a class="text-accent underline" href="{repo}/issues">{repo}</a>
			คุณต้องมีบัญชี GitHub (สมัครฟรี) รายการแจ้งทั้งหมดเปิดเผยต่อสาธารณะ
			จึงตรวจสอบได้ว่าเราตอบอะไรและแก้ไขอะไรไปแล้วบ้าง
		</p>
	</section>

	<section>
		<h2 class="border-rule border-b pb-1 font-semibold">ช่วยแนบข้อมูลพวกนี้มาด้วย</h2>
		<ol class="text-muted mt-1 list-decimal pl-5">
			<li>ชื่อแผนและตัวเลขที่คิดว่าผิด</li>
			<li>ค่าที่ถูกต้อง</li>
			<li>ลิงก์กรมธรรม์หรือหน้าเว็บบริษัทที่เป็นต้นทาง ไม่รับโบรชัวร์ขายของ</li>
		</ol>
	</section>

	<section>
		<h2 class="border-rule border-b pb-1 font-semibold">เราจะดำเนินการภายในกี่วัน</h2>
		<p class="text-muted">
			เราจะตอบกลับภายใน 7 วันนับจากวันที่ได้รับแจ้ง และแก้ไขหรือชี้แจงเหตุผลหากยังแก้ไขไม่ได้ภายใน 30 วัน
			ถ้าข้อโต้แย้งยังหาข้อสรุปไม่ได้ เราจะซ่อนตัวเลขนั้นไว้ก่อนจนกว่าจะตรวจสอบเสร็จ
			ประวัติการแก้ไขใน commit ของโครงการเปิดให้ตรวจสอบได้
		</p>
	</section>
</div>
