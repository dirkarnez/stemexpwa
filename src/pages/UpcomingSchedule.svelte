<script>
	import { useLocation, Link, Route, Router } from "svelte-routing";
	import SelectedUpcomingSchedule from "./SelectedUpcomingSchedule.svelte";

	import codingMinecraft from "../assets/images/upcoming-schedule/codingMinecraft/Level 1-min.png";
	import codingRoblox from "../assets/images/upcoming-schedule/codingRoblox/Level 1-min.png";
	import Coding_Python from "../assets/images/upcoming-schedule/Coding_Python/Level 1-min.png";
	import Coding_Scratch from "../assets/images/upcoming-schedule/Coding_Scratch/Level 1-min.png";
	import cyberVirtualRobotics from "../assets/images/upcoming-schedule/cyberVirtualRobotics/Level 1.png";
	import LEGO_Robotics from "../assets/images/upcoming-schedule/LEGO_Robotics/Level 1-min.png";
	import Vex_Robotics from "../assets/images/upcoming-schedule/Vex Robotics/Level 1-min.png";
	import AppInventor from "../assets/images/upcoming-schedule/AppInventor Mobile Apps/Level 1-min.png";
	import AIML from "../assets/images/upcoming-schedule/A.I. _ Machine Learning/Level 1-min.png";
	import ThreeD_Design_Printing from "../assets/images/upcoming-schedule/3D_Design_Printing/Level 1-min.png";
	import Micro_bit from "../assets/images/upcoming-schedule/Micro_bit/Level 1-min.png";
	import AR_VR from "../assets/images/upcoming-schedule/AR_VR/Level 1-min.png";
	import SmartCity from "../assets/images/upcoming-schedule/Smart City/Level 1-min.png";

	import codingMinecraftElementary from "../assets/images/upcoming-schedule/codingMinecraft/Level 2-Elementary-min.png";
	import codingMinecraftIntroductory from "../assets/images/upcoming-schedule/codingMinecraft/Level 2-Introductory-min.png";
	import codingMinecraftIntermediate from "../assets/images/upcoming-schedule/codingMinecraft/Level 2-Intermediate-min.png";
	import codingMinecraftAdvanced from "../assets/images/upcoming-schedule/codingMinecraft/Level 2-Advanced-min.png";
	import codingMinecraftMaster from "../assets/images/upcoming-schedule/codingMinecraft/Level 2-Master-min.png";

	import codingRobloxIntroductory from "../assets/images/upcoming-schedule/codingRoblox/Level 2- Introductory-min.png";
	import codingRobloxIntermediate from "../assets/images/upcoming-schedule/codingRoblox/Level 2-Intermediate-min.png";

	import Coding_PythonAdvanced from "../assets/images/upcoming-schedule/Coding_Python/Level 2-Advanced-min.png";
	import Coding_PythonIntermediate from "../assets/images/upcoming-schedule/Coding_Python/Level 2-Intermediate-min.png";
	import Coding_PythonIntroductory from "../assets/images/upcoming-schedule/Coding_Python/Level 2-Introductory-min.png";
	import Coding_PythonMaster from "../assets/images/upcoming-schedule/Coding_Python/Level 2-Master-min.png";


	import Coding_ScratchIntermediate from "../assets/images/upcoming-schedule/Coding_Scratch/Level 2-Intermediate-min.png";
	import Coding_ScratchIntroductory from "../assets/images/upcoming-schedule/Coding_Scratch/Level 2-Introductory-min.png";
	import Coding_ScratchJr from "../assets/images/upcoming-schedule/Coding_Scratch/Level 2-Scratch Jr-min.png";

	import cyberVirtualRoboticsElementary from "../assets/images/upcoming-schedule/cyberVirtualRobotics/Level 2-Elementary.png";
	import cyberVirtualRoboticsIntermediate from "../assets/images/upcoming-schedule/cyberVirtualRobotics/Level 2-Intermediate.png";
	import cyberVirtualRoboticsIntroductory from "../assets/images/upcoming-schedule/cyberVirtualRobotics/Level 2-Introductory.png";
	import cyberVirtualRoboticsMaster from "../assets/images/upcoming-schedule/cyberVirtualRobotics/Level 2-Master.png";

	import LEGO_RoboticsAdvanced from "../assets/images/upcoming-schedule/LEGO_Robotics/Level 2-Advanced-min.png";
	import LEGO_RoboticsElementary from "../assets/images/upcoming-schedule/LEGO_Robotics/Level 2-Elementary-min.png";
	import LEGO_RoboticsIntermediate from "../assets/images/upcoming-schedule/LEGO_Robotics/Level 2-Intermediate-min.png";
	import LEGO_RoboticsIntroductory from "../assets/images/upcoming-schedule/LEGO_Robotics/Level 2-Introductory-min.png";

	import Vex_RoboticsIntroductory from "../assets/images/upcoming-schedule/Vex Robotics/Level 1-min.png";

	import AppInventorAdvanced from "../assets/images/upcoming-schedule/AppInventor Mobile Apps/Level 2-Advanced-min.png";
	import AppInventorIntermediate from "../assets/images/upcoming-schedule/AppInventor Mobile Apps/Level 2-Intermediate-min.png";
	import AppInventorIntroductory from "../assets/images/upcoming-schedule/AppInventor Mobile Apps/Level 2-Introductory-min.png";

	import AIMLAdvanced from "../assets/images/upcoming-schedule/A.I. _ Machine Learning/Level 2-Advanced-min.png";
	import AIMLIntermediate from "../assets/images/upcoming-schedule/A.I. _ Machine Learning/Level 2-Intermediate-min.png";
	import AIMLIntroductory from "../assets/images/upcoming-schedule/A.I. _ Machine Learning/Level 2-Introductory-min.png";

	import ThreeD_Design_PrintingIntermediate from "../assets/images/upcoming-schedule/3D_Design_Printing/Level 2-Intermediate-min.jpg";
	import ThreeD_Design_PrintingIntroductory from "../assets/images/upcoming-schedule/3D_Design_Printing/Level 2-Introductory-min.jpg";

	import Micro_bitIntermediate from "../assets/images/upcoming-schedule/Micro_bit/Level 2-Intermediate-min.png";
	import Micro_bitIntroductory from "../assets/images/upcoming-schedule/Micro_bit/Level 2-Introductory-min.png";

	import AR_VRIntermediate from "../assets/images/upcoming-schedule/AR_VR/Level 2-Intermediate-min.png";
	import AR_VRIntroductory from "../assets/images/upcoming-schedule/AR_VR/Level 2-Introductory-min.png";

	import SmartCityElementary from "../assets/images/upcoming-schedule/Smart City/Level 2-Elementary-min.png";
	import SmartCityIntermediate from "../assets/images/upcoming-schedule/Smart City/Level 2-Intermediate-min.png";
	import SmartCityIntroductory from "../assets/images/upcoming-schedule/Smart City/Level 2-Introductory-min.png";

	let location = useLocation();

	const colors = [
		"rgb(33, 209, 100)",
		"rgb(219, 93, 50)",
		"rgb(247, 163, 27)",
		"rgb(33, 130, 209)",
		"rgb(222, 219, 49)",
		"rgb(145, 20, 186)"
	];

	const courses = new Map([
		[ "coding-minecraft", 
			{ name: "Coding Minecraft", icon: codingMinecraft, 
				subCategories: [ 
					{ name: "Coding Minecraft Elementary", icon: codingMinecraftElementary, routePath: "elementary" }, 
					{ name: "Coding Minecraft Introductory", icon: codingMinecraftIntroductory, routePath: "introductory" }, 
					{ name: "Coding Minecraft Intermediate", icon: codingMinecraftIntermediate , routePath: "intermediate" }, 
					{ name: "Coding Minecraft Advanced", icon: codingMinecraftAdvanced , routePath: "advanced" }, 
					{ name: "Coding Minecraft Master", icon: codingMinecraftMaster , routePath: "master" }  
				]
			} 
		],
		[ "coding-roblox", 
			{ name: "Coding Roblox", icon: codingRoblox,
				subCategories: [
					{ name: "Coding Roblox Introductory", icon: codingRobloxIntroductory, routePath: "introductory" },
					{ name: "Coding Roblox Intermediate", icon: codingRobloxIntermediate, routePath: "intermediate" }
				]
			} 
		],
		[ "coding-python", 
			{ name: "Coding Python", icon: Coding_Python,
				subCategories: [
					{ name: "Coding Python Introductory", icon: Coding_PythonIntroductory, routePath: "introductory" },
					{ name: "Coding Python Intermediate", icon: Coding_PythonIntermediate, routePath: "intermediate" },
					{ name: "Coding Python Advanced", icon: Coding_PythonAdvanced, routePath: "advanced" },
					{ name: "Coding Python Master", icon: Coding_PythonMaster, routePath: "master" }
				]
			} 
		],
		[ "coding-scratch", 
			{ name: "Coding Scratch", icon: Coding_Scratch,
				subCategories: [
					{ name: "Coding Scratch Jr", icon: Coding_ScratchJr, routePath: "jr" },
					{ name: "Coding Scratch Introductory", icon: Coding_ScratchIntroductory, routePath: "introductory" },
					{ name: "Coding Scratch Intermediate", icon: Coding_ScratchIntermediate, routePath: "intermediate" }
				]
			}
		],
		[ "cyber-virtual-robotics", 
			{ name: "Cyber Virtual Robotics", icon: cyberVirtualRobotics,
				subCategories: [
					{ name: "Cyber Virtual Robotics Elementary", icon: cyberVirtualRoboticsElementary, routePath: "elementary" },
					{ name: "Cyber Virtual Robotics Introductory", icon: cyberVirtualRoboticsIntroductory, routePath: "introductory" },
					{ name: "Cyber Virtual Robotics Intermediate", icon: cyberVirtualRoboticsIntermediate, routePath: "intermediate" },
					{ name: "Cyber Virtual Robotics Master", icon: cyberVirtualRoboticsMaster, routePath: "master" }
				]
			} 
		],
		[ "lego-robotics", 
			{ name: "Lego Robotics", icon: LEGO_Robotics,
				subCategories: [
					{ name: "Lego Robotics Elementary - Wedo", icon: LEGO_RoboticsElementary, routePath: "elementary" },
					{ name: "Lego Robotics Introductory - EV3", icon: LEGO_RoboticsIntroductory, routePath: "introductory" },
					{ name: "Lego Robotics Intermediate - EV3", icon: LEGO_RoboticsIntermediate, routePath: "intermediate" },
					{ name: "Lego Robotics Advanced - EV3", icon: LEGO_RoboticsAdvanced, routePath: "advanced" }
				]
			} 
		],
		[ "vex-robotics", 
			{ name: "VEX Robotics", icon: Vex_Robotics,
				subCategories: [
					{ name: "VEXRobotics Introductory", icon: Vex_RoboticsIntroductory, routePath: "introductory" }
				]
			} 
		],
		[ "appinventor-mobile-apps", 
			{ name: "AppInventor Mobile Apps", icon: AppInventor,
				subCategories: [
					{ name: "AppInventor Introductory", icon: AppInventorIntroductory, routePath: "introductory" },
					{ name: "AppInventor Intermediate", icon: AppInventorIntermediate, routePath: "intermediate" },
					{ name: "AppInventor Advanced", icon: AppInventorAdvanced, routePath: "advanced" }
				]
			} 
		],
		[ "ai-machine-learning", 
			{ name: "A.I. & Machine Learning", icon: AIML,
				subCategories: [
					{ name: "A.I. & Machine Learning Introductory", icon: AIMLIntroductory, routePath: "introductory" },
					{ name: "A.I. & Machine Learning Intermediate", icon: AIMLIntermediate, routePath: "intermediate" },
					{ name: "A.I. & Machine Learning Advanced", icon: AIMLAdvanced, routePath: "advanced" }
				]
			} 
		],
		[ "3d-design-printing", 
			{ name: "3D Design & Printing", icon: ThreeD_Design_Printing,
				subCategories: [
					{ name: "3D Design & Printing Introductory", icon: ThreeD_Design_PrintingIntroductory, routePath: "introductory" },
					{ name: "3D Design & Printing Intermediate", icon: ThreeD_Design_PrintingIntermediate, routePath: "intermediate" }
				]
			} 
		],
		[ "microbits", 
			{ name: "Micro:bits", icon: Micro_bit,
				subCategories: [
					{ name: "Micro:bit Digital Making Introductory", icon: Micro_bitIntroductory, routePath: "introductory" },
					{ name: "Micro:bit Digital Making Intermediate", icon: Micro_bitIntermediate, routePath: "intermediate" }
				]
			} 
		],
		[ "ar-vr", 
			{ name: "AR / VR", icon: AR_VR,
				subCategories: [
					{ name: "AR / VR Introductory", icon: AR_VRIntroductory, routePath: "introductory" },
					{ name: "AR / VR Intermediate", icon: AR_VRIntermediate, routePath: "intermediate" }
				]
			} 
		],
		[ "smart-city", 
			{ name: "Smart City", icon: SmartCity,
				subCategories: [
					{ name: "Smart City Elementary", icon: SmartCityElementary, routePath: "elementary" },
					{ name: "Smart City Introductory", icon: SmartCityIntroductory, routePath: "introductory" },
					{ name: "Smart City Intermediate", icon: SmartCityIntermediate, routePath: "intermediate" }
				]
			} 
		]
	]);
	
</script>

<Router>
	{#each [...courses] as [ routePath ]}
		<Route path="/{routePath}/*" courses={courses} colors={colors} routePath={routePath} component={SelectedUpcomingSchedule}/>
	{/each}
	<Route path="/">
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>Upcoming Schedule</h4>
				</div>
			</div>
		</div>
		<div class="columns is-multiline is-mobile">
			{#each [...courses] as [ routePath, course ], index}
				<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
					<Link to={`${$location.pathname}/${routePath}`}>
						<div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
							<div class="card-image">
								<figure class="image is-96x96">
									<img src={course.icon ?? "https://bulma.io/images/placeholders/96x96.png"} 
										style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
										alt="Placeholder">
								</figure>
							</div>
							<div class="card-content pt-0 pb-0">
								<div class="content" style="height: 96px;width: 100%;">
									<div class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1" style="height: 100%; width: 100%">
										<p style="color: white; text-align: center;" class="is-size-5 is-size-6-tablet has-text-weight-semibold">{course.name}</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			{/each}
		</div>
	</Route>
</Router>
