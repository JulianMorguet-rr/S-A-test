<template>
    <div>
        <h2>JobList.vue</h2>
        <!-- <div>raw XML data: {{ data }}</div> -->
        <!-- <div v-html="personioHTML" /> -->
        <div v-for="(job, index) in personioJSON" :key="index" >
            <!-- {{ job }}
            {{ job.position }} -->
            <div v-for="(position, index) in job.position" :key="index" class="border">
                <h3>ID: {{ position.id }}</h3>
                <h2>{{ position.name }}</h2>
                <h4>
                    {{ position.office }} | 
                    {{ position.department }} | 
                    <span v-if="position.recruitingCategory === 'Festangestellte' ">
                        Festanstellung
                    </span>
                    <span v-else>
                        {{position.recruitingCategory}}
                    </span>
                </h4>
                <p>{{ position }}</p>
            </div>
        </div>
        <br>
        <div>
            <p>personioJSON:</p>
            {{ personioJSON }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// XML to HTML
const response = await fetch('https://rheinland-relations-gmbh.jobs.personio.de/xml');
const data = await response.text();
import { DOMParser } from 'xmldom';
const XMLparser = new DOMParser();
const personioHTML = computed(() => {
    // console.log(XMLparser.parseFromString(data, "text/xml"))
    return XMLparser.parseFromString(data, "text/xml");
})

// XML to JSON
import fastXmlParser from 'fast-xml-parser';
const personioJSON = ref(null)
onMounted(async () => {
  // Fetch die XML-Daten
  const response = await fetch('https://rheinland-relations-gmbh.jobs.personio.de/xml');
  const xmlString = await response.text();

  console.log(xmlString)

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

  console.log('fastXmlParser: ', fastXmlParser)
  personioJSON.value = XMLParser.parse(xmlString, options);
  console.log('personioJSON: ', personioJSON.value)
});

</script>

<style scoped>
.border {
    border: 3px solid black;
    margin-bottom: 64px;
}
</style>
