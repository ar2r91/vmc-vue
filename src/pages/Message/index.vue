<template>

</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {}
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            message: function (data) {
                alert(data)
                console.log('data', data);
            }
        },
    }
</script>
