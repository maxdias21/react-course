import {isEmail, isEqualToOtherValue, isNotEmpty, hasMinLength} from "../util/validation.js";

import {useActionState} from 'react';

export default function Signup() {
    // Aqui eu recebo apenas formData
    // O prevFormState eu recebo pois estou usando o hook useActionState, se eu não tivesse usando esse hook, só receberia formData
    function signupAction(prevFormState, formData) {
        // Pegar campos individuais
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const role = formData.get('role');
        const terms = formData.get('terms');
        // Aqui eu posso ter mais de um campo, por isso getAll
        const acquisitionChannel = formData.getAll('acquisition');


        let errors = [];

        if (!isEmail(email)) {
            errors.push('Please enter a valid email');
        }

        if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
            errors.push('You must provide a password with at least 6 characters.');
        }

        if (!isEqualToOtherValue(password, confirmPassword)) {
            errors.push('Passwords do not match');
        }

        if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
            errors.push('Please provide both your first name and last name.');
        }

        if (!isNotEmpty(role)) {
            errors.push('You must provide a role');
        }

        if (!terms) {
            errors.push('You must agree to the terms and conditions.');
        }

        if (acquisitionChannel.length === 0) {
            errors.push('Please select at least one acquisition channel');
        }


        // Eu retorno os errors + enteredValues
        // EnteredValues vai servir para o usuário não perder o que digitou quando clicar no botão de enviar
        // pois por padrão, eu perco esses campos, com o enteredValues, eu evito isso
        // Tenho que ir no campo input e colocar enteredValues.nomedocampo
        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {email, firstName, lastName, role, terms, confirmPassword, password, acquisitionChannel}
            };
        }

        return {errors: null, enteredValues: {}};
    }

    // useActionState eu passo a função que ele vai executar que é signupAction
    // {errors: null} é o valor padrão, ou seja, sem errors no momento
    // formState o que eu retorno na função vai para o formState
    // formAction eu passo para o action no form
    const [formState, formAction] = useActionState(signupAction, {errors: null});


    // formAction é uma forma de lidar com formulários
    // Ele não tem preventDefault, ele funciona de uma forma diferente
    return (
        <form action={formAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email}/>
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password}/>
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        defaultValue={formState.enteredValues?.confirmPassword}
                    />
                </div>
            </div>

            <hr/>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.firstName}/>
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.lastName}/>
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                        defaultChecked={formState.enteredValues?.acquisitionChannel?.includes('google')}
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                        defaultChecked={formState.enteredValues?.acquisitionChannel?.includes('friend')}
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisitionChannel?.includes('other')}/>
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" defaultValue={formState.enteredValues?.terms}/>I
                    agree to the terms and conditions
                </label>
            </div>

            {formState.errors && <ul className="errors">
                {formState.errors.map(error => <li key={error}>{error}</li>)}
            </ul>}

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
