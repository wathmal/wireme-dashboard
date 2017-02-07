/**
 * Created by wathmal on 2/7/17.
 */

import React, {PropTypes} from 'react';
import style from './Tutorial.scss';
import { Card, CardText} from 'react-toolbox/lib/card';

class Tutorial extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
        title: React.PropTypes.string.isRequired,
        subtext: React.PropTypes.string,
        sections: React.PropTypes.array
    };

    componentDidMount(){
        scratchblocks.renderMatching('pre.blocks');

        $('body').css('position', 'relative');
        $('body').scrollspy({ target: '#tutorialSpy', offset: 200 });
    }

    render() {
        let scrollSections;
        if(this.props.sections){
            scrollSections = this.props.sections.map((sec, idx) =>{
                if(idx == 0){
                    return <li className="active" key={idx}><a href={'#'+sec.id}>{sec.title}</a></li>;
                }
                else{
                    return <li key={idx}><a href={'#'+sec.id}>{sec.title}</a></li>;
                }
            });
        }

        return (
            <div className={style.tutorial}>
                <div className="container">
                    <div className="text-center">
                        <h1>{this.props.title}</h1>
                        <h5><code>{this.props.subtext}</code></h5>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <nav id="tutorialSpy" className={style.tutorialSpy} style={{paddingTop: 40}}>
                                <ul className="nav" style={{position: 'fixed', width: '18%', border: '1px solid #9E9E9E', borderRadius: 10}}>
                                    
                                    {scrollSections}
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-8">
                            <div style={{paddingTop: 40}}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class TutorialSection extends React.Component {
    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string
    };

    render(){

        return(
            <div className={style.section} id={this.props.id}>
                <h4>{this.props.title}</h4>

                {this.props.children}
            </div>
        );
    }
}

class CodeBlock extends React.Component {
    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
        title: React.PropTypes.string.isRequired,
        image: React.PropTypes.string,
        step: React.PropTypes.number,
        description: React.PropTypes.string,
        code: React.PropTypes.string,

    };

    render(){

        return(
            <div className={style.codeBlock}>
                <div className={style.blockContainer}>

                        <h5><code>{"step "+ this.props.step}</code></h5>
                        <h5 style={{paddingBottom: 10}}>{this.props.title}</h5>
                        <div className="row">


                            <div className="col-md-6">
                                {(this.props.code)?
                                    <pre className="blocks">{this.props.code}</pre>
                                    :
                                    <img className="img-responsive" src={this.props.image} alt=""/>
                                }
                            </div>
                            <div className="col-md-6">
                                <p className={style.blockDescription}>
                                    {this.props.description}
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export {Tutorial};
export {TutorialSection};
export {CodeBlock};