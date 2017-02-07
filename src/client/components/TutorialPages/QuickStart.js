/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';
import Header from './../Header/Header';
import {Tutorial, TutorialSection, CodeBlock} from './../Tutorial/Tutorial';
import {Button} from 'react-toolbox/lib/button';


class QuickStart extends React.Component {

    constructor() {
        super();

    }

    componentDidMount(){
        // scratchblocks.renderMatching('pre.blocks');
    }

    render() {

        const tutorialSections= [
            {
                id: "section1",
                title: "1. downloading and installation"
            },
            {
                id: "section2",
                title: "2. Get to know the IoT Hub"
            },
            {
                id: "section3",
                title: "3. Start Your First Program"
            },
            {
                id: "section4",
                title: "4. Let's Activate WireMe Nemesis"
            },
            {
                id: "section5",
                title: "5. Our Online Dashboard"
            }
        ];

        return (
            <div>
                <Header title="quick start" />

                <Tutorial title="getting started" subtext="think. drag and drop. no coding" sections={tutorialSections}>
                    <TutorialSection title={tutorialSections[0].title} id={tutorialSections[0].id}>
                        <p>Download WireMe IoT Hub for Windows from <a href="https://goo.gl/ASRPec" target='_blank'>this link</a> or below button.</p>
                        <p>once downloaded, Extract the downloaded zip file. Then run the <code>WireMe.exe</code> from your extracted location and allow networking in your firewall if prompted.</p>

                        <Button icon="cloud_download" label='download' href="https://goo.gl/ASRPec" target='_blank' raised style={{backgroundColor: '#0d7c82', color:'#ffffff'}}/>

                    </TutorialSection>

                    <TutorialSection title={tutorialSections[1].title} id={tutorialSections[1].id}>
                        <p>main components of the IOT hub are identified as below.</p>

                        <img className="img-responsive" src="images/landing/vptool-mac.png" alt=""/>
                    </TutorialSection>
                    <TutorialSection title={tutorialSections[2].title} id={tutorialSections[2].id}>

                        <p>Let's Make a Gadget to Monitor Home Temperature</p>
                        <CodeBlock step={1} title={"configure wifi setup"} code={"start :: #008599 hat \n set wifi [name] and [password] :: #008599"} description={"replace name and password with your wifi network name and password."} />
                        <CodeBlock step={2} title={"Add forever block from control"} code={"start :: #008599 hat \n set wifi [name] and [password] :: #008599 \n forever"} description={""} />
                        <CodeBlock step={3} title={"Add send to dashboard block and read temperature block"} code={"start :: #008599 hat \n set wifi [name] and [password] :: #008599 \n forever \n send to dashboard :[] as [temperature1] :: #008599 \n  \n  \n start :: #008599 hat \n set wifi [name] and [password] :: #008599 \n forever \n send to dashboard : (get temperature from [red v] socket :: #008599)  as [temperature1] :: #008599"} description={"add description here."} />
                        <CodeBlock step={4} title={"Add new sprites"} image={"images/tutorial/add_new.png"} description={"select \"new sprite\" button under main stage to add a widget."} />
                        <CodeBlock step={5} title={"Configure the widget"} code={"configure widget :: #F77B00 hat \n set name [room temperature] :: #F77B00 \n send [temperature1] data to widget :: #F77B00  \n "} description={"now configure the widget name and what data need to show in it. here we set it to show \"temp\" data."} />

                        {/*<p>You can download this simple example project from <a href="#">here.</a></p>*/}
                    </TutorialSection>

                    <TutorialSection title={tutorialSections[3].title} id={tutorialSections[3].id}>
                        <p>its time to connect your gadgets. <code>wireme</code> comes with a main controller unit which we call <b>nemesis</b> and other sensor / actuator modules.</p>
                        <p>follow below instructions to connect and program it.</p>

                        <CodeBlock step={1} title={"Connect the WireMe Nemesis to computer via USB"} image="http://placehold.it/350x200" description="add some" />
                        <CodeBlock step={2} title={"Connect the gadgets according to color labels"} image="http://placehold.it/350x200" description="add some" />
                        <CodeBlock step={3} title={"Turn on the WireMe Nemesis"} image="http://placehold.it/350x200" description="add some" />
                        <CodeBlock step={4} title={"select correct serial port in IOT hub"} image="http://placehold.it/350x200" description="select connect -> serial port -> COM X. now you will be able to see the red circle inside wireme block turns green." />
                        <CodeBlock step={5} title={"upload the program"} image="http://placehold.it/350x200" description="verify your program is correct. then click 'upload' button in code pane. this will upload your program to 'nemesis' and post your widgets to our dashboard." />
                    </TutorialSection>

                    <TutorialSection title={tutorialSections[4].title} id={tutorialSections[4].id}>
                        <p>now you can access your temperature data through our online dashboard. go to dashboard by clicking <b>home button</b> or below link.</p>
                        <Button icon="home" label='dashboard' href="/dashboard" target='_blank' raised />
                    </TutorialSection>

                </Tutorial>
            </div>
        )
    }

}

export default QuickStart;