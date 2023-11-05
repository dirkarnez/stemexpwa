<script>
  import { onMount } from "svelte";
	import { /*useLocation,*/ Route, Router } from "svelte-routing";
    import { required } from "svelte-forms/validators";
    import { WrappedFetch } from "../utils/fetch";
	import { getHost } from "../utils/api";
    import { form, field, defaultFieldOptions  } from "svelte-forms";

	// let location = useLocation();

    let wrappedFetchServerFilesPromise = null;

    let files;
	let fileListOnServer = {total_count: 0};

	
	const filesPerPagination = 20;

	let from = 0;

	let isLoading = false;

	$: paginationArray = Array(((fileListOnServer.total_count - (fileListOnServer.total_count % filesPerPagination)) / filesPerPagination) + (fileListOnServer.total_count % filesPerPagination > 0 ? 1 : 0)).fill(0).map((_, i) => i + 1);

	const getFiles = () => {
		isLoading = true;
        const [ _wrappedFetchServerFilesPromise, abort ] = WrappedFetch(`/api/files?from=${from}&to=${from + filesPerPagination}`)
        wrappedFetchServerFilesPromise = _wrappedFetchServerFilesPromise;
		wrappedFetchServerFilesPromise.then(data => {
			fileListOnServer = data;
			isLoading = false;
		})
    };

    onMount(() => {
		getFiles();
	});

    const file = field("file", "", [required()], {
		...defaultFieldOptions,
		validateOnChange: false
	});
	
	function setPage(i) {
		from = (i * filesPerPagination); 
		getFiles();
	}

    const myForm = form(file);

    function handleSubmit() {
        // myForm.validate().then(() => {
        //     if ($myForm.valid) {
        //         const formData = new FormData();
        //         formData.append("file", );

        let formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append("files[]", files[i]);
            }

                const [  wrappedFetchPromise , abort ] = WrappedFetch("/api/upload", {
                    method: "POST",
                    body: formData
                });

                wrappedFetchPromise.then(response => {
                    location.reload();
                })

        // });
    }
</script>

<Router>
	<Route path="/">
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>File Management</h4>
				</div>
			</div>
		</div>
		<div class="columns is-multiline is-mobile">
			{#if isLoading}
				<p>Loading</p>
			{:else}
				{#if !!fileListOnServer}
					{#each [...(Array.isArray(fileListOnServer.files) ? fileListOnServer.files : [])] as { id, original_physical_file_name }, index}
						<div
							class="column is-one-third-desktop is-half-tablet is-full-mobile"
						>
							<div class="card is-flex is-flex-direction-row">
								<div class="card-image">
									<figure class="image is-96x96">
										<img
											src={ `${getHost()}${id ? `/api/resourses?id=${id}`  :""}`}
											style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;"
											alt="Placeholder"
										/>
									</figure>
								</div>
								<div class="card-content pt-0 pb-0">
									<div class="content" style="height: 96px;width: 100%;">
										<div
											class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1"
											style="height: 100%; width: 100%"
										>
											<p
												style="text-align: center; word-break: break-all;"
												class="is-size-5 is-size-6-tablet has-text-weight-semibold"
											>
												{original_physical_file_name}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			{/if}
		</div>

		<div class="pagination is-centered" role="navigation" aria-label="pagination">
			<ul class="pagination-list">
				{#each paginationArray as pageNumberDisplay, i}
					{#if (from / filesPerPagination) + 2 - i <= 4 || i == 0 || i == paginationArray.length - 1}
						<li><button on:click={() => setPage(i)} class="pagination-link {from / filesPerPagination == i ? "is-current" : ""}" aria-label="Goto page {pageNumberDisplay}">{pageNumberDisplay}</button></li>
					{/if}
					{#if i == 0} 
						<li><span class="pagination-ellipsis">&hellip;</span></li>
					{:else if i == paginationArray.length - 2} 
						<li><span class="pagination-ellipsis">&hellip;</span></li>
					{/if}
					

					
					<!-- <li><button class="pagination-link" aria-label="Goto page 1">1</button></li>
					<li><span class="pagination-ellipsis">&hellip;</span></li>
					<li><button class="pagination-link" aria-label="Goto page 45">45</button></li>
					<li><button class="pagination-link " aria-label="Page 46" aria-current="page">46</button></li>
					<li><button class="pagination-link" aria-label="Goto page 47">47</button></li>
					<li><span class="pagination-ellipsis">&hellip;</span></li>
					<li><button class="pagination-link" aria-label="Goto page 86">86</button></li> -->
				{/each}
			</ul>
		</div>


        <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
            <div class="file">
                <label class="file-label">
                    <input bind:files class="file-input" type="file" />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload" />
                        </span>
                        <span class="file-label"> Choose a file… </span>
                    </span>
                </label>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary">Submit</button>
                </div>
            </div>
        </form>
	</Route>
</Router>
