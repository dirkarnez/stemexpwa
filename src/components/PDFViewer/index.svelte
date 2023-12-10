<!-- <svelte:head>
	<script src="/pdfjs-dist/build/pdf.mjs" type="module" on:load={() => {isPDFLibLoaded = true; tryDoStuff();}}/>
    <script src="/pdfjs-dist/web/pdf_viewer.mjs" type="module" on:load={() => {isViewerLoaded = true; tryDoStuff();}}/>
    <link rel="stylesheet" href="/pdfjs-dist/web/pdf_viewer.css">
</svelte:head> -->

<script>
	import { onMount } from 'svelte';
	// import PdfViewer from 'svelte-pdf';
	import { WrappedFetchData } from '../../utils/fetch';


    // // import * as pdfjsLib from "pdfjs-dist/webpack";
    // // import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer.mjs";

    // // pdfViewer.setDocument(myState.pdf);
    // let canvas;
    // let container;

    // let isViewerLoaded = false;
    // let isPDFLibLoaded = false;

    export let url = "";

    let data;

    onMount(() => {
        const [ a ] = WrappedFetchData(url);
        debugger;
        a.then(aa => {
            data = aa;
        });
    })

    // // let pdfPage = null;

    // function tryDoStuff() {
    //     if (!isViewerLoaded || !isPDFLibLoaded) {
    //         return;
    //     }

    //     if (!pdfjsLib.getDocument || !pdfjsViewer.PDFPageView) {
    //         // eslint-disable-next-line no-alert
    //         alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
    //     }

    //     pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs-dist/build/pdf.worker.mjs";


        
    //         // Loading document.
    //         const loadingTask = pdfjsLib.getDocument({
    //             url: url/*,
    //             cMapUrl: CMAP_URL,
    //             cMapPacked: CMAP_PACKED,
    //             enableXfa: ENABLE_XFA,
    //             */
    //         });

    //         loadingTask.promise.then(pdfDocument => {
    //             debugger;
    //         })
    // }

    // onMount(() => {
    //     console.log(url);

    //         // // Document loaded, retrieving the page.
    //         // const pdfPage = await pdfDocument.getPage(PAGE_TO_VIEW);

    //         // // Creating the page view with default parameters.
    //         // const pdfPageView = new pdfjsViewer.PDFPageView({
    //         // container,
    //         // id: PAGE_TO_VIEW,
    //         // scale: SCALE,
    //         // defaultViewport: pdfPage.getViewport({ scale: SCALE }),
    //         // eventBus,
    //         // });
    //         // // Associate the actual page with the view, and draw it.
    //         // pdfPageView.setPdfPage(pdfPage);
    //         // pdfPageView.draw();


    //     // setTimeout(() => {
            
    //     //     // Loading a document.
    //     //     const loadingTask = pdfjsLib.getDocument({url, withCredentials: true});
    //     //     // Setting worker path to worker bundle.
    //     //     loadingTask.promise
    //     //     .then(pdfDocument => pdfDocument.getPage(1))
    //     //     .then(_pdfPage => {
    //     //             // // Display page on the existing canvas with 100% scale.
    //     //             // pdfPage = _pdfPage;
    //     //             // //render(pdfPage);
    //     //             // const eventBus = new pdfjsViewer.EventBus();
                        
    //     //             // const PAGE_TO_VIEW = 1;
    //     //             // const SCALE = 1.0;
                    
    //     //             // // Creating the page view with default parameters.
    //     //             // const pdfPageView = new pdfjsViewer.PDFPageView({
    //     //             //     container,
    //     //             //     id: PAGE_TO_VIEW,
    //     //             //     scale: SCALE,
    //     //             //     defaultViewport: pdfPage.getViewport({ scale: SCALE }),
    //     //             //     eventBus,
    //     //             // });
    //     //             // // Associate the actual page with the view, and draw it.
    //     //             // pdfPageView.setPdfPage(pdfPage);
    //     //             // pdfPage.draw();
    //     //     })
    //     // }, 1000)
    //     // // Request a first page
    //     debugger;
    // })


    // // function render(pdfPage) {
    // //     console.log("!")
    // //     if (!pdfPage) {
    // //         return;
    // //     }

    // //     const viewport = pdfPage.getViewport({ scale: 1.0 });
    // //     debugger;
    // //     canvas.width = viewport.width;
    // //     canvas.height = viewport.height;

    // //     var outputScale = 1; //var outputScale = window.devicePixelRatio || 1;
    // //     canvas.width = Math.floor(viewport.width * outputScale);
    // //     canvas.height = Math.floor(viewport.height * outputScale);

    // //     // canvas.style.width = Math.floor(viewport.width) + "px";
    // //     // canvas.style.height =  Math.floor(viewport.height) + "px";
    // //     // var transform = outputScale !== 1
    // //     // ? [outputScale, 0, 0, outputScale, 0, 0]
    // //     // : null;

    // //     const ctx = canvas.getContext("2d");
    // //     const renderTask = pdfPage.render({
    // //         canvasContext: ctx,
    // //         viewport,
    // //     });
    // //     renderTask.promise.then(() => {
    // //         //resetRatio(pdfPage)
    // //     })
    // // }

    // // function resetRatio(page) {
    // //     var scale = 1;
    // //     var viewport = page.getViewport({ scale: scale, });

    // //     // Support HiDPI-screens.
    // //     // var outputScale = window.devicePixelRatio || 1;
    // //     var outputScale = 1;
    // //     var context = canvas.getContext('2d');

    // //     canvas.width = Math.floor(viewport.width * outputScale);
    // //     canvas.height = Math.floor(viewport.height * outputScale);
    // //     canvas.style.width = Math.floor(viewport.width) + "px";
    // //     canvas.style.height =  Math.floor(viewport.height) + "px";

    // //     var transform = outputScale !== 1
    // //     ? [outputScale, 0, 0, outputScale, 0, 0]
    // //     : null;

    // //     var renderContext = {
    // //         canvasContext: context,
    // //         transform: transform,
    // //         viewport: viewport
    // //     };
    // //     page.render(renderContext);
    // // }


    // // window.addEventListener('resize', () => {
    // //     render(pdfPage);
    // // }, false);

</script>

<!-- {#if !!data}
<div style="width: 100%">
    <PdfViewer data={data}/>
</div>
{/if} -->

<!-- 

<div id="viewerContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>


<style>
	#viewerContainer {
        overflow: auto;
        position: absolute;
        width: 100%;
	}

	/* canvas {
		width: 100%;
		height: 100%;
		background-color: #666;
	} */
</style> -->
