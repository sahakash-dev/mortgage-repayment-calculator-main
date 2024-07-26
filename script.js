const defaultText = document.getElementById("default-text")
const calculationsContainer = document.getElementById("calculations-container")

document.querySelectorAll(".mortagage-type").forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected')
        })
        if(this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})

document.getElementById('calculate-btn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortagage-amount').value)
    const term = parseFloat(document.getElementById('mortagage-term').value)
    const rate = parseFloat(document.getElementById('interest-rate').value)/100
    const mortagageType = document.querySelector('input[name="mortagage-type"]:checked')

    let isValid = true

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })

    if(isNaN(amount) || amount<=0){
        document.getElementById('amount-alert').style.display = 'block'
        document.getElementById('mortagage-amount-main').classList.add('error')
        isValid = false
    }else{
        document.getElementById('amount-alert').style.display = 'none'
    }

    if(isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = 'block'
        document.getElementById('mortagage-term-main').classList.add('error')
        isValid = false
    }else{
        document.getElementById('term-alert').style.display = 'none'
    }

    if(isNaN(rate) || rate <= 0) {
        document.getElementById('term-alert').style.display = 'block'
        document.getElementById('interest-term-main').classList.add('error')
        isValid = false
    }else{
        document.getElementById('term-alert').style.display = 'none'
    }

    if(!mortagageType){
        document.getElementById('type-alert').style.display = 'block'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error')
        })
        isValid = false
    }else{
        document.getElementById('type-alert').style.display = 'block'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.remove('error')
        })
    }

    if(isValid){
        let monthlyPayment = 0;
        let totalRepayment = 0;

        defaultText.classList.add('hide')
        calculationsContainer.classList.add('show')

        if(mortagageType.value === 'repayment') {
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n))
            totalRepayment = monthlyPayment * n
        } else if(mortagageType.value === 'interest-only'){
           monthlyPayment = (amount * rate) / 12
           totalRepayment = monthlyPayment * term * 12
        }
        document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`
        document.getElementById('term-result').innerText = `$${totalRepayment.toFixed(2)}`
    }else{
        document.getElementById('result').innerText = ''
        document.getElementById('term-result').innerText = ''


        defaultText.classList.remove('hide')
        calculationsContainer.classList.remove('show')
    }
}) 

document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('mortagage-form').reset()
    document.getElementById('result').innerText = ''
    document.getElementById('term-result').innerText = ''
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none'
    })
    defaultText.classList.remove('hide')
    calculationsContainer.classList.remove('show')

    document.querySelectorAll('.radio-inputs').forEach(div => {
        div.classList.remove('selected')
    })

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })
})

document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none'
})

