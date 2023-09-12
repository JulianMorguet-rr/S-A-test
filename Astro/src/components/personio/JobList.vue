<script setup lang="ts">
import { ref, onMounted } from "vue";


interface RecruitingData {
    _updatedAt: string;
    _createdAt: string;
    personioXMLFeed: string;
    heading: string;
    _rev: string;
    _type: string;
    _id: string;
}
const props = defineProps({
  recruitingData: Object as () => RecruitingData
})

/**
 * XML to JSON
*/ 
import fastXmlParser from 'fast-xml-parser';

const personioURL = props.recruitingData.personioXMLFeed
console.log('personioURL from JobList.vue: ', personioURL)



const personioJSON = ref(null)
onMounted(async () => {

    console.log('OnMounted fired in JobList.vue ASYNC')
    // Fetch die XML-Daten
    const response = await fetch(props.recruitingData.personioXMLFeed);
    const xmlString = await response.text();

    // console.log(xmlString)

    // Parse die XML-Daten mit fast-xml-parser
    const options = {
        attributeNamePrefix: '',
        textNodeName: '#text',
        ignoreAttributes: false,
        ignoreNameSpace: false,
        parseAttributeValue: true,
        parseNodeValue: true,
        trimValues: true,
        cdataTagName: '__cdata', // optional, wenn CDATA-Unterstützung erforderlich ist
    };

    const XMLParser = new fastXmlParser.XMLParser();

    // console.log('fastXmlParser: ', fastXmlParser)
    // @ts-ignore
    personioJSON.value = XMLParser.parse(xmlString, options);

    console.log('personioJSON.value: ', personioJSON.value)
});


/*
 * XML to HTML
 */
// const response = await fetch(props.recruitingData.personioXMLFeed);
// const data = await response.text();
// import { DOMParser } from 'xmldom';
// const XMLparser = new DOMParser();
// const personioHTML = computed(() => {
//     return XMLparser.parseFromString(data, "text/xml");
// })

// console.log('props.title:', props.recruitingData)

</script>

<template>
    <div>
        <h2>JobList.vue!!!</h2>

        <!-- <p>URL: {{ personioURL }}</p> -->

        <br>

        <div>
            <p>personioJSON</p>
            <pre>
                <!-- {{ props.recruitingData }} -->
                <!-- {{ personioJSON }} -->
            </pre>
        </div>

        <!-- <p>personioJSON: {{ personioJSON }}</p> -->

        <!-- <div>raw XML data: {{ data }}</div> -->
        <!-- <div v-html="personioHTML" /> -->
        <div v-for="(job, index) in personioJSON" :key="index" >
            <!-- {{ job }} -->
            <!-- {{ job.position }} -->
            
            <!-- Wenn mehrere Jobs in XML, dann "v-for="(position, index) in job.position" -->
            <div v-for="(position, index) in job" :key="index" class="job-position-wrapper box-shadow margin-bottom-1u"> 
                
                <div class="flex">
                    <div class="flex-child position-name">
                        <!-- <p class="color-grey">Position</p> -->
                        <h2>{{ position.name }}</h2>
                        <!-- <h4>ID: {{ position.id }}</h4> -->
                        <span v-if="position.recruitingCategory === 'Festangestellte' ">
                            Festanstellung
                        </span>
                        <span v-else>
                            {{position.recruitingCategory}}
                        </span>
                    </div>

                    <div class="flex-child location">
                        <!-- <p class="color-grey">Location</p> -->
                        <h3>
                            {{ position.office }}
                        </h3>
                    </div>

                    <div class="flex-child">
                        <!-- <p class="color-grey">Team</p> -->
                        <h3>{{ position.department }}</h3>
                    </div>

                    <div class="flex-child apply-button">
                        <button class="apply">
                            Jetzt Bewerben
                        </button>
                    </div>
                </div>

                <!-- <div>
                    <p>{{ position }}</p>
                </div> -->
                
                <div v-for="(description, index) in position.jobDescriptions.jobDescription" :key="index">
                    <hr>
                    <div  v-html="description.value">
                    </div>
                </div>
               
            </div>
        </div>
        <br>
        <!-- <div>
            <p>personioJSON:</p>
            {{ personioJSON }}
        </div> -->
    </div>
</template>

<style scoped lang="scss">

body {
    font-family: sans-serif;
    background-color: #fbfbfb;
}

.job-position-wrapper {
    background-color: white;
    padding: 1.2rem 1.6rem;

    h2 {
        font-size: 20px;
        font-weight: 400;
        color: #047484;
    }

    h3 {
        font-size: 18px;
        font-weight: 400;
    }

    p {
        margin-bottom: 6px;
        // margin-block-start: 0;
        // margin-block-end: 0;
    }

    .apply-button {
        display: flex;
        justify-content: flex-end;
    }
}
.flex {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    /* flex-flow: row wrap; */
    align-items: stretch;
    vertical-align: middle;

}
.flex-child {
    flex-basis: 0;
    flex-grow: 1;
    // display: inline-grid;
    // vertical-align: middle;
    // align-items: center;
}

.border {
    border: 1px solid black;
}
.margin-bottom-1u {
    margin-bottom: 2rem;
}

.box-shadow {
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.1);
}


.color-grey {
    color: #999;
}

button {
    background: #EEE;
    border: none;
    padding: 0.6rem 1.6rem;
    border-radius: 50px;
    height: fit-content;
    cursor: pointer;
    &.apply {
        background: #047484;
        color: white;
    }
}

/* */ 
.position-name {
    flex-grow: 2.5;
}
</style>
