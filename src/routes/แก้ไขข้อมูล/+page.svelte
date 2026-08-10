<script lang="ts">
	const repo = 'https://github.com/ChindanaiNaKub/thai-health-compare';
</script>

<svelte:head><title>แจ้งแก้ไขข้อมูล — เทียบประกันสุขภาพไทย</title></svelte:head>

<h1 class="text-2xl font-semibold">แจ้งแก้ไขข้อมูล</h1>

<div class="mt-4 max-w-2xl space-y-4">
	<p class="text-muted">
		ถ้าตัวเลขหรือเงื่อนไขในหน้านี้ผิด ล้าสมัย หรือไม่ตรงกับกรมธรรม์ กรุณาแจ้งได้เลย
		ไม่ต้องเป็นตัวแทนหรือเจ้าหน้าที่บริษัทก็แจ้งได้ และเราไม่เก็บข้อมูลติดต่อของคุณไว้ใช้อย่างอื่น
	</p>

	<section>
		<h2 class="font-semibold">ช่องทาง</h2>
		<p class="text-muted mt-1">
			เปิด issue ที่ <a class="text-accent underline" href="{repo}/issues">{repo}</a> —
			ต้องมีบัญชี GitHub (สมัครฟรี) ทุก issue เปิดเผยต่อสาธารณะ
			จึงตรวจสอบได้ว่าเราตอบอะไรและแก้อะไรไปแล้วบ้าง
		</p>
	</section>

	<section>
		<h2 class="font-semibold">ช่วยแนบสิ่งนี้มาด้วย</h2>
		<ol class="text-muted mt-1 list-decimal pl-5">
			<li>ชื่อแผนและตัวเลขที่คิดว่าผิด</li>
			<li>ค่าที่ถูกต้อง</li>
			<li>ลิงก์เอกสารต้นทาง — กรมธรรม์หรือหน้าเว็บบริษัท ไม่รับโบรชัวร์ขายของ</li>
		</ol>
	</section>

	<section>
		<h2 class="font-semibold">เราจะทำอะไรและภายในเมื่อไหร่</h2>
		<p class="text-muted">
			ตอบรับภายใน 7 วัน และแก้ไขหรือชี้แจงเหตุผลที่ไม่แก้ภายใน 30 วันนับจากวันที่ได้รับแจ้ง
			ถ้าข้อโต้แย้งยังหาข้อสรุปไม่ได้ เราจะซ่อนตัวเลขนั้นไว้ก่อนจนกว่าจะตรวจสอบเสร็จ
			การแก้ไขทุกครั้งบันทึกอยู่ในประวัติ commit ของโครงการซึ่งเปิดให้ตรวจสอบได้
		</p>
	</section>
</div>
