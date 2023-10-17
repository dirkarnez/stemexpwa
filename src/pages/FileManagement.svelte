<script>
  import { onMount } from "svelte";
	import { /*useLocation,*/ Route, Router } from "svelte-routing";
    import { required } from "svelte-forms/validators";
    import { WrappedFetch } from "../utils/fetch";
	import { toUUIDexString } from "../utils/UUIDex";
	import { getHost } from "../utils/api";
    import { form, field, defaultFieldOptions  } from "svelte-forms";

	// let location = useLocation();

    let wrappedFetchServerFilesPromise = null;

    let files;

    onMount(() => {
        const [ _wrappedFetchServerFilesPromise, abort ] = WrappedFetch("/api/files")
        wrappedFetchServerFilesPromise = _wrappedFetchServerFilesPromise;
    });

    const file = field("file", "", [required()], {
		...defaultFieldOptions,
		validateOnChange: false
	});
	

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
			{#if !!wrappedFetchServerFilesPromise}
				{#await wrappedFetchServerFilesPromise}
					<p>...waiting</p>
				{:then fileManagement}
					{#each [...(Array.isArray(fileManagement.files) ? fileManagement.files : [])] as { id }, index}
						<div
							class="column is-one-third-desktop is-half-tablet is-full-mobile"
						>
							<div class="card is-flex is-flex-direction-row">
								<div class="card-image">
									<figure class="image is-96x96">
										<img
											src={ `${getHost()}${id ? `/api/resourses?id=${toUUIDexString(id)}`  :""}`}
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
												{toUUIDexString(id)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			{/if}
		</div>
        <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
            <div class="file">
                <label class="file-label">
                    <input bind:files class="file-input"  type="file" />
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
