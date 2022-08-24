import moment from "moment";
// import Vue from "vue";

const filter = ('time', (a) => {
    return moment(a).format('MMM Do YYYY')
})

const subString = ('subString', (content, length) => {
    return content.substring(0, length)
})

const capitalize = ('capitalize', (value) => {
    if(!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1) 
})

export default {filter, subString, capitalize}