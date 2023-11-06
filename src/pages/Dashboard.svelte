<script>
	import { onMount } from "svelte";
  	import { Link } from "svelte-routing";

	export let userName = "";
	export let role = "";
</script>

<div class="columns">
	<div class="column">
		<div class="content">
			<h1 class="mb-1">Hello!</h1>
			<h2 class="mt-0">{userName}</h2>
			<h4 class="mt-1">STEMex Hub</h4>
		</div>
	</div>
	<div class="column">
		<div class="field">
			<div class="control has-icons-right">
				<input class="input" type="text" placeholder="Search..." />
				<span class="icon is-small is-right">
					<i class="fas fa-search" />
				</span>
			</div>
		</div>
	</div>
</div>
<div class="columns is-multiline is-mobile">
	{#if role == "parent"}
		<div class="column is-half-desktop is-full-tablet is-full-mobile">
			<div class="columns is-multiline is-mobile">
				{#each [
					{ description: "Booked Classes", backgroundColor: "#7e1bf7", routePath: "booked-classes", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock align-middle clock" _ngcontent-neb-c68=""><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`}, 
					{ description: "Stemex Academy Curriculum", backgroundColor: "#f7891b", routePath: "stemex-academy-curriculum", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open align-middle book-open" _ngcontent-blg-c68=""><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`}, 
					{ description: "Student Portfolio", backgroundColor: "#1be1f7", routePath: "student-portfolio", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid align-middle grid" _ngcontent-neb-c68=""><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`}, 
					{ description: "Installation Guide", backgroundColor: "#f22ee5", routePath: "installation-guide", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download-cloud align-middle download-cloud" _ngcontent-neb-c68=""><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>`}, 
				] as {description, backgroundColor, routePath, svg}}
					<div class="column is-half">
						<Link to="/{routePath}">
							<div class="box has-text-centered p-5" style="background-color: {backgroundColor}; color: white; height: 100%;">
								<div class="is-flex is-justify-content-center pb-3" style="width: 100%">
									<div style="align-items: center;
										background: #fff;
										border-radius: 50%;
										display: flex;
										height: 50px;
										justify-content: center;
										width: 50px;
										color: {backgroundColor}">
										{@html svg}
									</div>
								</div>
								<h2>{description}</h2>
							</div>
						</Link>
					</div>
				{/each}
			</div>
		</div>
		<div class="column is-half-desktop is-full-tablet is-full-mobile">
			<div class="box" style="height: 100%;">
				<div class="content">
					<h4 class="mb-1">Headquarter Location</h4>
					<p>
						<a href="https://goo.gl/maps/kgEGzJdup1wxkPt19" target="_blank"
							>Unit 501, 5/F Austin Tower, 152 Austin Road, Tsim Sha Tsui</a
						>
					</p>
					<h4 class="mb-1">School Hours</h4>
					<p>
						Mon-Sat: 09:30-18:30<br />
						Sun: Closed
					</p>
					<h4 class="mb-1">Phone & Email</h4>
					<p>
						Phone: <a href="tel:+852 3462 2018" target="_blank">+852 3462 2018</a
						><br />
						WhatsApp:
						<a href="https://wa.me/85252859113" target="_blank">+852 5285 9113</a
						><br />
						Email:
						<a href="mailto:info@stemex.org" target="_blank">info@stemex.org</a>
					</p>
					<p>
						<a
							class="has-text-weight-bold is-flex is-align-items-center"
							href="https://hk.stemex.org/blog/"
							target="_blank"
						>
							STEMex Blog
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-chevrons-right"
								_ngcontent-jru-c68=""
								><polyline points="13 17 18 12 13 7" /><polyline
									points="6 17 11 12 6 7"
								/></svg
							>
						</a>
					</p>
					<p>
						
						{#each [
							{ href: "https://www.facebook.com/STEMexLimited", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook align-middle" _ngcontent-neb-c68=""><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`},
							{ href: "https://twitter.com/stemexltd", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter align-middle" _ngcontent-neb-c68=""><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`},
							{ href: "https://hk.linkedin.com/company/stemexlimited", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin align-middle" _ngcontent-neb-c68=""><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`},
							{ href: "https://www.instagram.com/stemex_academy/", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram align-middle" _ngcontent-neb-c68=""><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`},
							{ href: "https://www.youtube.com/channel/UCgbAqsG6RU_rebaASZNyhuA", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-youtube align-middle" _ngcontent-neb-c68=""><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`},
						] as { href, svg }}
							<a href={href} target="_blank" class="tag is-info mr-2" style="background-color: #d3e2f7; color: #4285f4; height: 40px; width: 40px">{@html svg}</a>
						{/each}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
