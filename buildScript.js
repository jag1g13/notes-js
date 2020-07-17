import fs from 'fs'
import fs_extra from 'fs-extra'
import child_process from 'child_process'

const build_dir = './build'
const deploy_dir = './server/build'

if (fs.existsSync(build_dir)) {
    fs_extra.removeSync(build_dir)
}

// Build frontend and deploy into server
child_process.execSync('react-scripts build', { stdio: 'inherit' })
fs_extra.moveSync(build_dir, deploy_dir, { overwrite: true })
