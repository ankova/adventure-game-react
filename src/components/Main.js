import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {caughtCreature, missedCreature, addCreature, releaseCreature, startReleasingCreature, orderBy} from '../actions';
import '../styles/main.scss';

const creatureNames = ['phoenix', 'medusa', 'hippogriff'];

export class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedName: creatureNames[0]
        }
    }

    catchIt(){
        const caught = Math.floor(Math.random() * 2);

        const {caughtCreature, missedCreature} = this.props.actions;

        if(caught){
            caughtCreature({
                age: Math.floor(Math.random() * 501),
                mana: 1000 + Math.floor(Math.random() * 10000 - 1000 + 1),
                captureTime: new Date().getTime()
            })
        } else {
            missedCreature({
                age: Math.floor(Math.random() * 501),
                mana: 1000 + Math.floor(Math.random() * 10000 - 1000 + 1)
            })
        }
    }

    addCreature(){
        const {selectedName: name} = this.state;
        const {caught, cages} = this.props;
        const {addCreature} = this.props.actions;
        const cageInd = cages.findIndex(c => !c.creature);

        console.log('addCreature', addCreature)

        addCreature(cageInd, {...caught, name});
    }

    releaseCreature(index){
        const {startReleasingCreature} = this.props.actions;

        startReleasingCreature(index);
    }

    sortCreatures(e) {
        const {orderBy} = this.props.actions;
        let selectedOption = e.target.value;
        orderBy(selectedOption);
    }

    render() {
        const {cages, caught, missed, totalAge, totalMana, totalCreatures} = this.props;
        const hasEmpty = cages.findIndex(c => !c.creature) >= 0;

        return(
            <div>
                <div className="show-total">
                    <span>Total creatures: {totalCreatures}</span>
                    <span>Total age: {totalAge}</span>
                    <span>Total mana: {totalMana}</span>
                </div>
                <div className="sort">
                    <span>Sort by</span>
                    <select onChange={::this.sortCreatures} defaultValue="captureTime" className="form-control">
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="mana">Mana</option>
                        <option value="captureTime">Capture time</option>
                    </select>
                </div>

                {!hasEmpty
                    ? <div className="catch">
                    All cages occupied.
                </div>
                    : <div className="catch">
                    { missed && <div className="msg-missed">MISSED HAHA !!!</div> }
                    { caught
                        ? <div>
                        <div className="add-name">
                            <span>Add name</span>
                            <select className="form-control" onChange={(evt) => this.setState({selectedName: evt.target.value})}>
                                {creatureNames.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <button onClick={::this.addCreature} className="btn btn-primary">Add</button>
                    </div>
                        : <button onClick={::this.catchIt} className="btn btn-primary">CATCH</button>
                    }
                </div>}
                <div className="captured">
                    {cages.map((c,i) => (
                        <div key={i} className="cage">
                            {c.creature &&
                            <div>
                                {c.releasing && <div className="releasing"></div>}
                                <button onClick={() => this.releaseCreature(i)} className="btn">Release</button>
                                <span className="creature-name">{c.creature.name}</span>
                                <div className="creature-details">
                                    <span className="age">Age: {c.creature.age}</span>
                                    <span className="mana">Mana: {c.creature.mana}</span>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const {cages, hunting: {caught, missed}} = state;
    return {
        cages,
        caught,
        missed,
        totalAge: cages.filter(c => c.creature).map(c => c.creature.age).reduce((acc, curr) => acc + curr, 0),
        totalMana: cages.filter(c => c.creature).map(c => c.creature.mana).reduce((acc, curr) => acc + curr, 0),
        totalCreatures: cages.filter(c => c.creature).length
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({caughtCreature,missedCreature,addCreature,releaseCreature, startReleasingCreature, orderBy}, dispatch) });

export default connect(mapStateToProps,mapDispatchToProps)(Main);