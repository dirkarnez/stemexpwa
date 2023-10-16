<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router } from "svelte-routing";
	import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getHost } from "../../utils/api";
	import { toUUIDexString } from "../../utils/UUIDex";
	
	let location = useLocation();

	const colors = [
		"rgb(33, 209, 100)",
		"rgb(219, 93, 50)",
		"rgb(247, 163, 27)",
		"rgb(33, 130, 209)",
		"rgb(222, 219, 49)",
		"rgb(145, 20, 186)"
	];

	// export let role = "";

	let wrappedFetchCurriculum = null;
	let curriculum = [];

	onMount(() => {
		const [  _wrappedFetchCurriculum ] = WrappedFetch("/api/curriculum");
		wrappedFetchCurriculum = _wrappedFetchCurriculum;
		wrappedFetchCurriculum.then(data => {
			curriculum = data;
		})
	});

	// const courses = new Map([
	// 	[ "coding-minecraft", 
	// 		{ name: "Coding Minecraft", icon: codingMinecraft, 
	// 			subCategories: [ 
	// 				{ name: "Coding Minecraft Elementary", icon: codingMinecraftElementary, routePath: "elementary" }, 
	// 				{ name: "Coding Minecraft Introductory", icon: codingMinecraftIntroductory, routePath: "introductory" }, 
	// 				{ name: "Coding Minecraft Intermediate", icon: codingMinecraftIntermediate , routePath: "intermediate" }, 
	// 				{ name: "Coding Minecraft Advanced", icon: codingMinecraftAdvanced , routePath: "advanced" }, 
	// 				{ name: "Coding Minecraft Master", icon: codingMinecraftMaster , routePath: "master" }  
	// 			]
	// 		} 
	// 	],
	// 	[ "coding-roblox", 
	// 		{ name: "Coding Roblox", icon: codingRoblox,
	// 			subCategories: [
	// 				{ name: "Coding Roblox Introductory", icon: codingRobloxIntroductory, routePath: "introductory" },
	// 				{ name: "Coding Roblox Intermediate", icon: codingRobloxIntermediate, routePath: "intermediate" }
	// 			]
	// 		} 
	// 	],
	// 	[ "coding-python", 
	// 		{ name: "Coding Python", icon: Coding_Python,
	// 			subCategories: [
	// 				{ name: "Coding Python Introductory", icon: Coding_PythonIntroductory, routePath: "introductory" },
	// 				{ name: "Coding Python Intermediate", icon: Coding_PythonIntermediate, routePath: "intermediate" },
	// 				{ name: "Coding Python Advanced", icon: Coding_PythonAdvanced, routePath: "advanced" },
	// 				{ name: "Coding Python Master", icon: Coding_PythonMaster, routePath: "master" }
	// 			]
	// 		} 
	// 	],
	// 	[ "coding-scratch", 
	// 		{ name: "Coding Scratch", icon: Coding_Scratch,
	// 			subCategories: [
	// 				{ name: "Coding Scratch Jr", icon: Coding_ScratchJr, routePath: "jr" },
	// 				{ name: "Coding Scratch Introductory", icon: Coding_ScratchIntroductory, routePath: "introductory" },
	// 				{ name: "Coding Scratch Intermediate", icon: Coding_ScratchIntermediate, routePath: "intermediate" }
	// 			]
	// 		}
	// 	],
	// 	[ "cyber-virtual-robotics", 
	// 		{ name: "Cyber Virtual Robotics", icon: cyberVirtualRobotics,
	// 			subCategories: [
	// 				{ name: "Cyber Virtual Robotics Elementary", icon: cyberVirtualRoboticsElementary, routePath: "elementary" },
	// 				{ name: "Cyber Virtual Robotics Introductory", icon: cyberVirtualRoboticsIntroductory, routePath: "introductory" },
	// 				{ name: "Cyber Virtual Robotics Intermediate", icon: cyberVirtualRoboticsIntermediate, routePath: "intermediate" },
	// 				{ name: "Cyber Virtual Robotics Master", icon: cyberVirtualRoboticsMaster, routePath: "master" }
	// 			]
	// 		} 
	// 	],
	// 	[ "lego-robotics", 
	// 		{ name: "Lego Robotics", icon: LEGO_Robotics,
	// 			subCategories: [
	// 				{ name: "Lego Robotics Elementary - Wedo", icon: LEGO_RoboticsElementary, routePath: "elementary" },
	// 				{ name: "Lego Robotics Introductory - EV3", icon: LEGO_RoboticsIntroductory, routePath: "introductory" },
	// 				{ name: "Lego Robotics Intermediate - EV3", icon: LEGO_RoboticsIntermediate, routePath: "intermediate" },
	// 				{ name: "Lego Robotics Advanced - EV3", icon: LEGO_RoboticsAdvanced, routePath: "advanced" }
	// 			]
	// 		} 
	// 	],
	// 	[ "vex-robotics", 
	// 		{ name: "VEX Robotics", icon: Vex_Robotics,
	// 			subCategories: [
	// 				{ name: "VEXRobotics Introductory", icon: Vex_RoboticsIntroductory, routePath: "introductory" }
	// 			]
	// 		} 
	// 	],
	// 	[ "appinventor-mobile-apps", 
	// 		{ name: "AppInventor Mobile Apps", icon: AppInventor,
	// 			subCategories: [
	// 				{ name: "AppInventor Introductory", icon: AppInventorIntroductory, routePath: "introductory" },
	// 				{ name: "AppInventor Intermediate", icon: AppInventorIntermediate, routePath: "intermediate" },
	// 				{ name: "AppInventor Advanced", icon: AppInventorAdvanced, routePath: "advanced" }
	// 			]
	// 		} 
	// 	],
	// 	[ "ai-machine-learning", 
	// 		{ name: "A.I. & Machine Learning", icon: AIML,
	// 			subCategories: [
	// 				{ name: "A.I. & Machine Learning Introductory", icon: AIMLIntroductory, routePath: "introductory" },
	// 				{ name: "A.I. & Machine Learning Intermediate", icon: AIMLIntermediate, routePath: "intermediate" },
	// 				{ name: "A.I. & Machine Learning Advanced", icon: AIMLAdvanced, routePath: "advanced" }
	// 			]
	// 		} 
	// 	],
	// 	[ "3d-design-printing", 
	// 		{ name: "3D Design & Printing", icon: ThreeD_Design_Printing,
	// 			subCategories: [
	// 				{ name: "3D Design & Printing Introductory", icon: ThreeD_Design_PrintingIntroductory, routePath: "introductory" },
	// 				{ name: "3D Design & Printing Intermediate", icon: ThreeD_Design_PrintingIntermediate, routePath: "intermediate" }
	// 			]
	// 		} 
	// 	],
	// 	[ "microbits", 
	// 		{ name: "Micro:bits", icon: Micro_bit,
	// 			subCategories: [
	// 				{ name: "Micro:bit Digital Making Introductory", icon: Micro_bitIntroductory, routePath: "introductory" },
	// 				{ name: "Micro:bit Digital Making Intermediate", icon: Micro_bitIntermediate, routePath: "intermediate" }
	// 			]
	// 		} 
	// 	],
	// 	[ "ar-vr", 
	// 		{ name: "AR / VR", icon: AR_VR,
	// 			subCategories: [
	// 				{ name: "AR / VR Introductory", icon: AR_VRIntroductory, routePath: "introductory" },
	// 				{ name: "AR / VR Intermediate", icon: AR_VRIntermediate, routePath: "intermediate" }
	// 			]
	// 		} 
	// 	],
	// 	[ "smart-city", 
	// 		{ name: "Smart City", icon: SmartCity,
	// 			subCategories: [
	// 				{ name: "Smart City Elementary", icon: SmartCityElementary, routePath: "elementary" },
	// 				{ name: "Smart City Introductory", icon: SmartCityIntroductory, routePath: "introductory" },
	// 				{ name: "Smart City Intermediate", icon: SmartCityIntermediate, routePath: "intermediate" }
	// 			]
	// 		} 
	// 	]
	// ]);
	
</script>

<Router>
	{#if Array.isArray(curriculum)}
		{#each curriculum as { description, id } }
			<Route path={`/${stringToURLPart(description)}/*`}>
				<SelectedCurriculumCategory colors={colors} parentId={id}/>
			</Route>
		{/each}
	{/if}

	<Route path="/">
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>Stemex Academy Curriculum</h4>
				</div>
			</div>
		</div>
		<div class="columns is-multiline is-mobile">
			{#if Array.isArray(curriculum)}
				{#each curriculum as { description, icon_id }, index}
					<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
						<Link to={`${$location.pathname}/${stringToURLPart(description)}`}>
							<div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
								<div class="card-image">
									<figure class="image is-96x96">
										<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/ /* /api/resourses?id=23*/  `${getHost()}${icon_id ? `/api/resourses?id=${toUUIDexString(icon_id)}`  :""}`}
											style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
											alt="Placeholder">
									</figure>
								</div>
								<div class="card-content pt-0 pb-0">
									<div class="content" style="height: 96px;width: 100%;">
										<div class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1" style="height: 100%; width: 100%">
											<p style="color: white; text-align: center;" class="is-size-5 is-size-6-tablet has-text-weight-semibold">{description}</p>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				{/each}
			{/if}
		</div>
	</Route>
</Router>
