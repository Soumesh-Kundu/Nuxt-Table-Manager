<template>
  <Navbar />
  <div class="px-10">
    <div class="flex flex-col justify-between py-3 font-bold md:flex-row md:items-center md:text-xl md:py-5">
      <div>
        Last Changed at: <span class="text-gray-400"> 5/25/2023, 9:49:49 PM</span>
      </div>
      <div>
        Total Hours Last 3 Months: <span class="text-gray-400">0 Hours</span>
      </div>
      <div>
        Total Hours Next 3 Months: <span class="text-gray-400">0 Hours</span>
      </div>
    </div>
    <div class="">
      <h1 class="text-2xl font-bold md:text-4xl">PAST / CONTINUING STAGE</h1>
      <DataTable :DataArray="PastArray" :key="PastArray"  @onChange="totalValidData" :tHeadArray="PastTHead" collection="past" />
    </div>
    <div class="">
      <h1 class="text-2xl font-bold md:text-4xl">PRESENT / CONTINUING STAGE</h1>
      <DataTable :DataArray="PresentArray" :key="PresentArray"  @onChange="totalValidData" :tHeadArray="PresentTHead" collection="present" />
    </div>
    <div class="">
      <h1 class="text-2xl font-bold md:text-4xl">FUTURE / CONTINUING STAGE</h1>
      <DataTable :DataArray="FutureArray" :key="FutureArray"  @onChange="totalValidData" :tHeadArray="FutureTHead" collection="Future" />
    </div>
  </div>
  <div class="grid py-10 place-items-center">
    <button type="button" :disabled="user?.disabled"
      class="text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-xl px-5 py-2.5 mr-2 mb-2"
      @click="disableUser"
      :class="{ '!bg-gray-500 !text-black': !submitAvailabe }">Submit</button>
  </div>
</template>

<script setup>
const { app,mongo } = useRealm()
onMounted(async () => {
  if (!app.currentUser) {
    navigateTo('/login')
  }
  await app.currentUser.refreshAccessToken()
  await invalidateData()
  totalValidData()
})
const userCollection=mongo?.db('table')?.collection('users')
const user=useState('user')
const submitAvailabe = ref()
submitAvailabe.value=user?.value?.disabled?true:false
const PastArray = ref([]);
const PresentArray = ref([]);
const FutureArray = ref([]);
const PastTHead = [
  "Work to be done",
  "Hours Last 3 Months",
  "Hours Next 3 Months",
  "Primary Stakeholder",
  "Outcome",
  "Skills Required",
  "Work Quality",
  "Capability",
  "Interest",
  "Comment",
  "Action",
];
const PresentTHead = [
  "Work to be done",
  "Hours Last 3 Months",
  "Primary Stakeholder",
  "Outcome",
  "Skills Required",
  "Work Quality",
  "Capability",
  "Interest",
  "Comment",
  "Action",
];
const FutureTHead = [
  "Work to be done",
  "Capability",
  "Interest",
  "Comment",
  "Action",
];
async function isDataValid(values) {
  let valid = true
  if (!values.length) {
    return valid
  }
  for (const value of values) {
    if (!valid) {
      break
    }
    for (const key of Object.keys(value)) {
      if (key == 'comment') {
        continue
      }
      if(!value[key]){
        valid = false
        break
      }
      if (value[key].length === 0) {
        valid = false
        break
      }
    }
  }
  return valid
}
async function totalValidData() {
  const validities = await Promise.all([isDataValid(PastArray.value), isDataValid(PresentArray.value), isDataValid(FutureArray.value)])
  if (validities.every(item => (item))) {
    if (PastArray.value.length || PresentArray.value.length || FutureArray.value.length) {
      submitAvailabe.value = true
    }
    else {
      submitAvailabe.value = false
    }
  }
  else {
    submitAvailabe.value = false
  }
}

async function fetchtables(name, headArray) {
  const formatedHead = headArray.filter(item => item !== 'Action').map(item => `${item.split(" ").join("").toLowerCase()}\n`).join("")
  const queryString = `query{\n ${name}s{ \n_id\n ${formatedHead} } \n}`
  const res = await fetch(`https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${useRuntimeConfig().public.REALM_ID}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${app.currentUser.accessToken}`
    },
    body:JSON.stringify({
      query:queryString
    })
  })
  const data=await res.json()
  return data.data[`${name}s`]
}
async function invalidateData(){
  const PastPromise=fetchtables('past',PastTHead)
  const PresentPromise=fetchtables('present',PresentTHead)
  const FuturePromise=fetchtables('future', FutureTHead)
  const [pastData,presentData,futureData]=await Promise.all([PastPromise,PresentPromise,FuturePromise])
  PastArray.value=pastData
  PresentArray.value=presentData
  FutureArray.value=futureData
}
async function disableUser(){
  user.value.disabled=true
  await userCollection.updateOne({userId:app.currentUser.id},{$set:{disabled:true}})
}
</script>

